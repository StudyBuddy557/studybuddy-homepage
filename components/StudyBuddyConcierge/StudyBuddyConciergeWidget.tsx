'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  StudyBuddyConciergeState,
  Message,
  UserRole,
  MainConcern,
  AdvisorInterest,
  StudyBuddyLead,
} from './types';
import {
  createMessage,
  getGreetingMessage,
  getTestDateMessage,
  getTargetScoreMessage,
  getMainConcernMessage,
  getRecommendationMessage,
  getEmailCaptureMessage,
  getFirstNameMessage,
  getCompletionMessage,
  getNonStudentGreeting,
  getAdvisorInterestMessage,
  getAdvisorInterestResponse,
  getAdvisorEmailMessage,
  getAdvisorCompletionMessage,
  isValidEmail,
  extractScore,
} from './conversationFlow';

interface StudyBuddyConciergeWidgetProps {
  enabledPaths?: string[];
  avatarImageUrl?: string;
}

export default function StudyBuddyConciergeWidget({
  enabledPaths = ['/'],
  avatarImageUrl = '/StudyBuddy_AI_tutor_Avatar.png',
}: StudyBuddyConciergeWidgetProps) {
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isEnabledPage = enabledPaths.some((path) => pathname.includes(path));
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const hidden = localStorage.getItem('sbConciergeHide') === 'true';
    setIsHidden(hidden);
  }, []);

  const [state, setState] = useState<StudyBuddyConciergeState>({
    step: 'greeting',
    isPanelOpen: false,
    userRole: null,
    testDate: null,
    targetScore: null,
    mainConcern: null,
    email: null,
    firstName: null,
    advisorInterest: null,
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (state.isPanelOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([getGreetingMessage()]);
        setState((prev) => ({ ...prev, step: 'role_select' }));
      }, 500);
    }
  }, [state.isPanelOpen, messages.length]);

  if (isHidden || !isEnabledPage) {
    return null;
  }

  const togglePanel = () => {
    setState((prev) => ({ ...prev, isPanelOpen: !prev.isPanelOpen }));
  };

  const closePanel = () => {
    setState((prev) => ({ ...prev, isPanelOpen: false }));
  };

  const hideForever = () => {
    localStorage.setItem('sbConciergeHide', 'true');
    setIsHidden(true);
  };

  const addUserMessage = (text: string) => {
    const userMsg = createMessage('user', text);
    setMessages((prev) => [...prev, userMsg]);
  };

  const addBotMessage = (message: Message, delay = 800) => {
    setTimeout(() => {
      setMessages((prev) => [...prev, message]);
      setIsProcessing(false);
    }, delay);
  };

  const handleQuickReply = (value: string, displayText: string) => {
    addUserMessage(displayText);
    setIsProcessing(true);

    if (state.step === 'role_select') {
      const role = value as UserRole;
      setState((prev) => ({ ...prev, userRole: role, step: 'test_date' }));

      if (role === 'student') {
        addBotMessage(getTestDateMessage());
      } else {
        addBotMessage(getNonStudentGreeting(), 800);
        setTimeout(() => {
          addBotMessage(getAdvisorInterestMessage(), 1800);
          setState((prev) => ({ ...prev, step: 'advisor_interest' }));
        }, 800);
      }
    } else if (state.step === 'main_concern') {
      const concern = value as MainConcern;
      setState((prev) => ({ ...prev, mainConcern: concern, step: 'recommendation' }));

      if (state.targetScore !== null) {
        addBotMessage(getRecommendationMessage(state.targetScore, concern), 1000);
        setTimeout(() => {
          addBotMessage(getEmailCaptureMessage(), 2500);
          setState((prev) => ({ ...prev, step: 'email_capture' }));
        }, 1000);
      }
    } else if (state.step === 'advisor_interest') {
      const interest = value as AdvisorInterest;
      setState((prev) => ({ ...prev, advisorInterest: interest }));

      addBotMessage(getAdvisorInterestResponse(interest), 1000);
      setTimeout(() => {
        addBotMessage(getAdvisorEmailMessage(), 2500);
        setState((prev) => ({ ...prev, step: 'advisor_email' }));
      }, 1000);
    }
  };

  const saveLead = async (leadData: Partial<StudyBuddyLead>) => {
    try {
      const lead: StudyBuddyLead = {
        role: state.userRole!,
        testDate: state.testDate || undefined,
        targetScore: state.targetScore || undefined,
        mainConcern: state.mainConcern || undefined,
        email: state.email!,
        firstName: state.firstName || undefined,
        advisorInterest: state.advisorInterest || undefined,
        sourcePage: typeof window !== 'undefined' ? window.location.href : '',
        createdAt: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        ...leadData,
      };

      await addDoc(collection(db, 'studybuddy_concierge_leads'), {
        ...lead,
        firestoreTimestamp: serverTimestamp(),
      });

      console.log('StudyBuddy Concierge lead saved:', lead);
    } catch (error) {
      console.error('Error saving StudyBuddy Concierge lead:', error);
    }
  };

  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (!text || isProcessing) return;

    addUserMessage(text);
    setInputValue('');
    setIsProcessing(true);

    if (state.step === 'test_date') {
      setState((prev) => ({ ...prev, testDate: text, step: 'target_score' }));
      addBotMessage(getTargetScoreMessage());
    } else if (state.step === 'target_score') {
      const score = extractScore(text);
      setState((prev) => ({ ...prev, targetScore: score, step: 'main_concern' }));
      addBotMessage(getMainConcernMessage());
    } else if (state.step === 'email_capture') {
      if (isValidEmail(text)) {
        setState((prev) => ({ ...prev, email: text, step: 'first_name' }));
        addBotMessage(getFirstNameMessage());
      } else {
        addBotMessage(
          createMessage('bot', "That doesn't look like a valid email. Can you try again?"),
          500
        );
        setIsProcessing(false);
      }
    } else if (state.step === 'first_name') {
      setState((prev) => ({ ...prev, firstName: text, step: 'complete' }));
      saveLead({ firstName: text });
      addBotMessage(getCompletionMessage(), 1000);
    } else if (state.step === 'advisor_email') {
      if (isValidEmail(text)) {
        setState((prev) => ({ ...prev, email: text, step: 'complete' }));
        saveLead({ email: text });
        addBotMessage(getAdvisorCompletionMessage(), 1000);
      } else {
        addBotMessage(
          createMessage('bot', "That doesn't look like a valid email. Can you try again?"),
          500
        );
        setIsProcessing(false);
      }
    } else if (state.step === 'complete') {
      addBotMessage(
        createMessage('bot', "Is there anything else you'd like to know about StudyBuddy's TEAS prep?"),
        500
      );
      setIsProcessing(false);
    }
  };

  return (
    <>
      <button
        onClick={togglePanel}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #20b2aa 100%)',
          border: '3px solid white',
          boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease',
          zIndex: 99999,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <img
          src={avatarImageUrl}
          alt="StudyBuddy Avatar"
          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = '<div style="font-size:24px;font-weight:bold;color:#fff">SB</div>';
            }
          }}
        />
      </button>

      {state.isPanelOpen && (
        <div style={{
          position: 'fixed',
          right: '20px',
          bottom: '100px',
          width: '360px',
          maxWidth: 'calc(100vw - 40px)',
          maxHeight: 'calc(100vh - 140px)',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 99998,
          overflow: 'hidden',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #20b2aa 100%)',
            color: '#fff',
            padding: '16px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>StudyBuddy – TEAS Prep Concierge</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={hideForever} style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}>
                  Don't show again
                </button>
                <button onClick={closePanel} style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '18px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}>
                  ×
                </button>
              </div>
            </div>
            <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
              Get answers, plan your prep, and find the right StudyBuddy plan.
            </p>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            background: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {messages.map((msg) => (
              <div key={msg.id}>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  maxWidth: '85%',
                  alignSelf: msg.type === 'bot' ? 'flex-start' : 'flex-end',
                  flexDirection: msg.type === 'user' ? 'row-reverse' : 'row',
                }}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: msg.type === 'bot' ? '#1e3a8a' : '#fff',
                      color: msg.type === 'bot' ? '#fff' : '#1e293b',
                      border: msg.type === 'user' ? '1px solid #e2e8f0' : 'none',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: msg.text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                    }}
                  />
                </div>

                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply.value, reply.text)}
                        disabled={isProcessing}
                        style={{
                          background: '#fff',
                          border: '2px solid #20b2aa',
                          color: '#1e3a8a',
                          padding: '8px 16p