'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Send, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  Timestamp,
  doc,
  getDoc,
  setDoc,
  increment,
  serverTimestamp
} from 'firebase/firestore';

// ============================================================
// TYPES
// ============================================================
interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Timestamp;
}

interface UserTier {
  plan: 'free' | 'basic' | 'pro';
  dailyLimit: number;
  questionsUsedToday: number;
  lastResetDate: string;
}

// ============================================================
// CONSTANTS
// ============================================================
const TIER_LIMITS = {
  free: 3,      // Guest/free users: 3 questions to hook them
  basic: 10,    // Basic plan: 10/day
  pro: Infinity // Pro plan: unlimited
};

const SESSION_KEY = 'studybuddy_session_id';
const USER_KEY = 'studybuddy_user_id';

// ============================================================
// HELPER: Get or create session
// ============================================================
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

function getUserId(): string {
  if (typeof window === 'undefined') return '';
  // In production, this would come from Firebase Auth
  // For now, use localStorage or session-based ID
  let userId = localStorage.getItem(USER_KEY);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(USER_KEY, userId);
  }
  return userId;
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AIChat() {
  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  
  // Data State
  const [messages, setMessages] = useState<Message[]>([]);
  const [userTier, setUserTier] = useState<UserTier>({
    plan: 'free',
    dailyLimit: TIER_LIMITS.free,
    questionsUsedToday: 0,
    lastResetDate: new Date().toDateString()
  });
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sessionId = useRef<string>('');
  const userId = useRef<string>('');

  // ============================================================
  // INITIALIZATION
  // ============================================================
  useEffect(() => {
    sessionId.current = getOrCreateSessionId();
    userId.current = getUserId();
    
    // Fetch user tier from Firestore (or set default for guests)
    const fetchUserTier = async () => {
      if (!userId.current) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', userId.current));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const today = new Date().toDateString();
          
          // Reset daily count if new day
          if (data.lastResetDate !== today) {
            await setDoc(doc(db, 'users', userId.current), {
              ...data,
              questionsUsedToday: 0,
              lastResetDate: today
            }, { merge: true });
            
            setUserTier({
              plan: data.plan || 'free',
              dailyLimit: TIER_LIMITS[data.plan as keyof typeof TIER_LIMITS] || TIER_LIMITS.free,
              questionsUsedToday: 0,
              lastResetDate: today
            });
          } else {
            setUserTier({
              plan: data.plan || 'free',
              dailyLimit: TIER_LIMITS[data.plan as keyof typeof TIER_LIMITS] || TIER_LIMITS.free,
              questionsUsedToday: data.questionsUsedToday || 0,
              lastResetDate: data.lastResetDate
            });
          }
        }
      } catch (err) {
        console.error('Error fetching user tier:', err);
      }
    };
    
    fetchUserTier();
  }, []);

  // ============================================================
  // FIRESTORE LISTENER - Real-time messages
  // ============================================================
  useEffect(() => {
    if (!isOpen || !sessionId.current || !userId.current) return;

    const messagesPath = `users/${userId.current}/sessions/${sessionId.current}/messages`;
    const messagesRef = collection(db, messagesPath);
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data()
        } as Message);
      });
      setMessages(newMessages);
      
      // Check if last message is from assistant (AI finished responding)
      if (newMessages.length > 0) {
        const lastMsg = newMessages[newMessages.length - 1];
        if (lastMsg.role === 'assistant') {
          setIsLoading(false);
        }
      }
    }, (err) => {
      console.error('Firestore listener error:', err);
      setError('Connection error. Please refresh.');
    });

    return () => unsubscribe();
  }, [isOpen]);

  // ============================================================
  // AUTO-SCROLL
  // ============================================================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ============================================================
  // SEND MESSAGE
  // ============================================================
  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;
    
    // Check rate limit
    const remainingQuestions = userTier.dailyLimit - userTier.questionsUsedToday;
    if (remainingQuestions <= 0 && userTier.plan !== 'pro') {
      setError(`Daily limit reached! Upgrade to Pro for unlimited questions.`);
      return;
    }

    setError(null);
    setIsLoading(true);
    const messageText = inputValue.trim();
    setInputValue('');

    try {
      // Write user message to Firestore (triggers Cloud Function)
      const messagesPath = `users/${userId.current}/sessions/${sessionId.current}/messages`;
      await addDoc(collection(db, messagesPath), {
        role: 'user',
        content: messageText,
        timestamp: Timestamp.now()
      });

      // Increment daily usage count
      if (userTier.plan !== 'pro') {
        await setDoc(doc(db, 'users', userId.current), {
          questionsUsedToday: increment(1),
          lastActivity: serverTimestamp()
        }, { merge: true });
        
        setUserTier(prev => ({
          ...prev,
          questionsUsedToday: prev.questionsUsedToday + 1
        }));
      }

    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      setIsLoading(false);
    }
  }, [inputValue, isLoading, userTier]);

  // ============================================================
  // TEXT-TO-SPEECH (OpenAI Onyx voice)
  // ============================================================
  const speakMessage = async (messageId: string, text: string) => {
    // Stop if already speaking this message
    if (speakingMessageId === messageId && isSpeaking) {
      audioRef.current?.pause();
      setIsSpeaking(false);
      setSpeakingMessageId(null);
      return;
    }

    // Stop any current audio
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setIsSpeaking(true);
    setSpeakingMessageId(messageId);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'onyx' })
      });

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
        URL.revokeObjectURL(audioUrl);
      };
      audioRef.current.play();

    } catch (err) {
      console.error('TTS error:', err);
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  const remainingQuestions = userTier.dailyLimit === Infinity 
    ? '∞' 
    : userTier.dailyLimit - userTier.questionsUsedToday;

  return (
    <>
      {/* Floating Avatar Button */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full shadow-xl hover:scale-105 transition-all group"
        aria-label="Open AI Tutor"
      >
        <Image 
          src="/StudyBuddy_AI_tutor_Avatar.png" 
          alt="AI Tutor" 
          width={64} 
          height={64} 
          className="rounded-full border-2 border-white/20"
        />
        {/* Pulse indicator */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image 
                  src="/StudyBuddy_AI_tutor_Avatar.png" 
                  alt="AI Tutor" 
                  width={40} 
                  height={40} 
                  className="rounded-full border border-white/30"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
              </div>
              <div>
                <div className="font-bold text-sm">StudyBuddy AI</div>
                <div className="text-xs text-slate-400">
                  {userTier.plan === 'pro' ? '🔥 Pro • Unlimited' : `${remainingQuestions} questions left today`}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Upgrade Banner (for non-Pro users) */}
          {userTier.plan !== 'pro' && userTier.questionsUsedToday >= userTier.dailyLimit * 0.7 && (
            <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs text-center">
              Running low on questions? <a href="/pricing" className="font-bold underline">Upgrade to Pro →</a>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-4">
            {/* Welcome message if empty */}
            {messages.length === 0 && (
              <div className="bg-white p-4 rounded-xl rounded-tl-none shadow-sm border border-slate-100 text-slate-700 text-sm leading-relaxed">
                <strong>Hey there! 👋</strong> I'm your TEAS 7 study buddy.
                <br/><br/>
                Try asking me:
                <ul className="list-disc pl-4 mt-2 space-y-1 text-slate-600">
                  <li>"Explain how the heart pumps blood"</li>
                  <li>"Help me with ratio word problems"</li>
                  <li>"Quiz me on grammar rules"</li>
                </ul>
              </div>
            )}

            {/* Message List */}
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.content}
                  
                  {/* TTS button for assistant messages */}
                  {msg.role === 'assistant' && msg.id && (
                    <button
                      onClick={() => speakMessage(msg.id!, msg.content)}
                      className="mt-2 text-slate-400 hover:text-indigo-600 transition-colors"
                      aria-label={isSpeaking && speakingMessageId === msg.id ? "Stop speaking" : "Read aloud"}
                    >
                      {isSpeaking && speakingMessageId === msg.id ? (
                        <VolumeX size={16} />
                      ) : (
                        <Volume2 size={16} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-3 rounded-xl rounded-tl-none shadow-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                disabled={isLoading || (userTier.plan !== 'pro' && userTier.questionsUsedToday >= userTier.dailyLimit)}
                className="flex-1 bg-slate-100 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50" 
                placeholder={
                  userTier.questionsUsedToday >= userTier.dailyLimit && userTier.plan !== 'pro'
                    ? "Daily limit reached"
                    : "Ask anything about TEAS 7..."
                }
              />
              <button 
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}