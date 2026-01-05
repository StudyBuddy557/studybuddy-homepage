/**
 * ENTERPRISE ANALYTICS TRACKING
 * Track every interaction for conversion optimization
 */

import { pushEvent } from '@/config/analytics';
import { db } from '@/lib/firebase';
import { doc, setDoc, increment, Timestamp } from 'firebase/firestore';

// ============================================================
// TYPES
// ============================================================

export interface ChatAnalytics {
  sessionId: string;
  userId?: string;
  startTime: Date;
  endTime?: Date;
  messagesCount: number;
  questionsAsked: number;
  ctasShown: number;
  ctasClicked: number;
  checkoutInitiated: boolean;
  planRecommended?: 'basic' | 'pro';
  conversionValue?: number;
  source?: string;
  device?: string;
  userAgent?: string;
}

export interface MessageAnalytics {
  sessionId: string;
  messageIndex: number;
  role: 'user' | 'assistant';
  contentLength: number;
  containsCTA: boolean;
  ctaType?: string;
  timestamp: Date;
  responseTime?: number;
}

export interface CTAAnalytics {
  sessionId: string;
  ctaType: 'checkout' | 'diagnostic' | 'upgrade' | 'login';
  ctaText: string;
  ctaURL: string;
  shown: boolean;
  clicked: boolean;
  messageIndex: number;
  timestamp: Date;
}

// ============================================================
// SESSION TRACKING
// ============================================================

export class ChatSessionTracker {
  private sessionId: string;
  private startTime: Date;
  private messagesCount = 0;
  private questionsAsked = 0;
  private ctasShown = 0;
  private ctasClicked = 0;
  
  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.startTime = new Date();
    this.initSession();
  }
  
  private async initSession() {
    // Track in Google Analytics
    pushEvent({
      event: 'chat_session_start',
      session_id: this.sessionId,
      timestamp: this.startTime.toISOString(),
    } as any);
    
    // Track in Firestore
    await setDoc(doc(db, 'chat_sessions', this.sessionId), {
      sessionId: this.sessionId,
      startTime: Timestamp.fromDate(this.startTime),
      messagesCount: 0,
      questionsAsked: 0,
      ctasShown: 0,
      ctasClicked: 0,
      checkoutInitiated: false,
      source: this.getSource(),
      device: this.getDevice(),
      userAgent: navigator.userAgent,
    });
  }
  
  async trackMessage(role: 'user' | 'assistant', content: string, containsCTA: boolean = false) {
    this.messagesCount++;
    
    if (role === 'user') {
      this.questionsAsked++;
    }
    
    // Track in GA
    pushEvent({
      event: 'chat_message',
      session_id: this.sessionId,
      message_role: role,
      message_index: this.messagesCount,
      contains_cta: containsCTA,
    } as any);
    
    // Update Firestore
    await setDoc(doc(db, 'chat_sessions', this.sessionId), {
      messagesCount: increment(1),
      questionsAsked: role === 'user' ? increment(1) : this.questionsAsked,
      lastMessageTime: Timestamp.now(),
    }, { merge: true });
    
    // Save individual message
    await setDoc(doc(db, 'chat_sessions', this.sessionId, 'messages', `msg_${this.messagesCount}`), {
      role,
      contentLength: content.length,
      containsCTA,
      timestamp: Timestamp.now(),
      messageIndex: this.messagesCount,
    });
  }
  
  async trackCTAShown(ctaType: string, ctaText: string, ctaURL: string) {
    this.ctasShown++;
    
    pushEvent({
      event: 'chat_cta_shown',
      session_id: this.sessionId,
      cta_type: ctaType,
      cta_text: ctaText,
      message_index: this.messagesCount,
    } as any);
    
    await setDoc(doc(db, 'chat_sessions', this.sessionId), {
      ctasShown: increment(1),
    }, { merge: true });
    
    await setDoc(doc(db, 'chat_sessions', this.sessionId, 'ctas', `cta_${this.ctasShown}`), {
      ctaType,
      ctaText,
      ctaURL,
      shown: true,
      clicked: false,
      messageIndex: this.messagesCount,
      timestamp: Timestamp.now(),
    });
  }
  
  async trackCTAClick(ctaType: string, ctaURL: string) {
    this.ctasClicked++;
    
    pushEvent({
      event: 'chat_cta_clicked',
      session_id: this.sessionId,
      cta_type: ctaType,
      cta_url: ctaURL,
    } as any);
    
    await setDoc(doc(db, 'chat_sessions', this.sessionId), {
      ctasClicked: increment(1),
      checkoutInitiated: ctaType === 'checkout',
      lastCTAClick: Timestamp.now(),
    }, { merge: true });
  }
  
  async trackSessionEnd() {
    const endTime = new Date();
    const duration = endTime.getTime() - this.startTime.getTime();
    
    pushEvent({
      event: 'chat_session_end',
      session_id: this.sessionId,
      duration_seconds: Math.floor(duration / 1000),
      messages_count: this.messagesCount,
      questions_asked: this.questionsAsked,
      ctas_shown: this.ctasShown,
      ctas_clicked: this.ctasClicked,
      conversion_rate: this.ctasShown > 0 ? (this.ctasClicked / this.ctasShown) : 0,
    } as any);
    
    await setDoc(doc(db, 'chat_sessions', this.sessionId), {
      endTime: Timestamp.fromDate(endTime),
      durationSeconds: Math.floor(duration / 1000),
      completed: true,
    }, { merge: true });
  }
  
  private getSource(): string {
    if (typeof window === 'undefined') return 'unknown';
    
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('utm_source') || 
           urlParams.get('ref') || 
           document.referrer || 
           'direct';
  }
  
  private getDevice(): string {
    if (typeof window === 'undefined') return 'unknown';
    
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  }
}

// ============================================================
// CONVERSION TRACKING
// ============================================================

export async function trackConversion(
  sessionId: string,
  planId: string,
  planName: string,
  value: number
) {
  // Track in GA
  pushEvent({
    event: 'purchase',
    transaction_id: `chat_${sessionId}`,
    value,
    currency: 'USD',
    plan_id: planId,
    plan_name: planName,
  });
  
  // Update session in Firestore
  await setDoc(doc(db, 'chat_sessions', sessionId), {
    converted: true,
    conversionTime: Timestamp.now(),
    planPurchased: planId,
    conversionValue: value,
  }, { merge: true });
}

// ============================================================
// ANALYTICS QUERIES (for dashboard)
// ============================================================

export const ChatAnalyticsQueries = {
  // Get conversion rate for a date range
  getConversionRate: async (startDate: Date, endDate: Date) => {
    // Implement Firestore query
    // This would be used in an admin dashboard
  },
  
  // Get average messages before conversion
  getAvgMessagesToConversion: async () => {
    // Implement aggregation query
  },
  
  // Get most effective CTAs
  getMostEffectiveCTAs: async () => {
    // Implement query to find highest-converting CTAs
  },
  
  // Get session drop-off points
  getDropOffAnalysis: async () => {
    // Analyze where users stop engaging
  },
};

export default ChatSessionTracker;
