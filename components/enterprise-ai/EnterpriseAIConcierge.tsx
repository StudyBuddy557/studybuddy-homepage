'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { pushEvent } from '@/config/analytics';

interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Timestamp;
  cta?: CallToAction;
}

interface CallToAction {
  type: 'upgrade' | 'diagnostic' | 'checkout' | 'login';
  text: string;
  url: string;
  primary: boolean;
}

const WELCOME_MESSAGE = {
  role: 'assistant' as const,
  content: "Hey! 👋\n\nI'm here to answer your TEAS questions and help you find the right study plan.\n\nWhat would you like to know?",
  timestamp: Timestamp.now(),
};

const HIDDEN_PAGES = ['/quiz', '/exam', '/practice', '/test', '/assessment'];

export default function EnterpriseAIConcierge() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [messageCount, setMessageCount] = useState(0);
  const [showPulse, setShowPulse] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const shouldHide = HIDDEN_PAGES.some(hiddenPath => pathname?.includes(hiddenPath));
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setShowBubble(false);
      pushEvent({ event: 'chat_opened', session_id: sessionId } as any);
    }
  }, [isOpen, sessionId]);
  
  useEffect(() => {
    const pulseTimer = setTimeout(() => setShowPulse(false), 10000);
    const bubbleTimer = setTimeout(() => setShowBubble(true), 5000);
    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(bubbleTimer);
    };
  }, []);
  
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Timestamp.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setMessageCount(prev => prev + 1);
    
    try {
      const response = await fetch('/api/enterprise-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          sessionId,
          messageCount: messageCount + 1,
        }),
      });
      
      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: Timestamp.now(),
        cta: data.cta,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      pushEvent({ event: 'chat_message_sent', session_id: sessionId, message_count: messageCount + 1 } as any);
      
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Ask me anything about TEAS 7 prep! 😊',
        timestamp: Timestamp.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCTAClick = (cta: CallToAction) => {
    pushEvent({ event: 'chat_cta_clicked', session_id: sessionId, cta_type: cta.type, cta_url: cta.url } as any);
    window.location.href = cta.url;
  };
  
  if (shouldHide) return null;
  
  return (
    <>
      {/* Floating Avatar - Smaller on mobile */}
      <AnimatePresence>
        {!isOpen && (
          <>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={() => setIsOpen(true)}
              className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
            >
              {showPulse && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#20B2AA] to-[#3B82F6] opacity-75 animate-ping" />
              )}
              
              <div className="relative w-14 h-16 md:w-20 md:h-24 bg-gradient-to-br from-[#E0F7F7] to-white rounded-[28px] md:rounded-[40px] shadow-xl hover:shadow-[0_0_30px_rgba(32,178,170,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-[#20B2AA]/20 overflow-hidden">
                <Image 
                  src="/StudyBuddy_AI_tutor_Avatar.png"
                  alt="StudyBuddy AI"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 56px, 80px"
                  priority
                />
                <span className="absolute top-1 right-1 md:top-2 md:right-2 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full shadow-lg"></span>
              </div>
            </motion.button>
            
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="fixed bottom-20 md:bottom-32 right-4 md:right-6 z-40 bg-white rounded-2xl shadow-2xl p-3 md:p-4 max-w-[180px] md:max-w-[240px] border border-gray-200"
                >
                  <button
                    onClick={() => setShowBubble(false)}
                    className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs hover:bg-gray-700"
                  >
                    ×
                  </button>
                  <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1">Hi! Need help passing the TEAS?</p>
                  <p className="text-[10px] md:text-xs text-gray-600">Ask me anything 👇</p>
                  <div className="absolute bottom-0 right-6 md:right-8 w-0 h-0 border-l-[6px] md:border-l-[8px] border-l-transparent border-r-[6px] md:border-r-[8px] border-r-transparent border-t-[6px] md:border-t-[8px] border-t-white transform translate-y-full"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
      
      {/* Chat Window - FULL SCREEN on mobile, floating on desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 bottom-0 md:top-auto md:left-auto md:bottom-6 md:right-6 md:w-[400px] md:h-[600px] lg:w-[440px] lg:h-[680px] z-50 bg-white md:rounded-3xl shadow-2xl border-0 md:border md:border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#20B2AA] to-[#1A8F88] px-4 py-3 md:px-6 md:py-4 text-white shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="relative w-8 h-10 md:w-10 md:h-12 bg-white/20 rounded-[16px] md:rounded-[20px] backdrop-blur-sm overflow-hidden border border-white/30">
                    <Image 
                      src="/StudyBuddy_AI_tutor_Avatar.png"
                      alt="StudyBuddy AI"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold">StudyBuddy AI</h3>
                    <p className="text-[10px] md:text-xs text-white/90">TEAS 7 Expert</p>
                  </div>
                </div>
                
                <button onClick={() => setIsOpen(false)} className="p-1.5 md:p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.role === 'user' ? 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white rounded-[18px] md:rounded-[20px] rounded-br-md' : 'bg-white border border-gray-200 text-gray-900 rounded-[18px] md:rounded-[20px] rounded-bl-md'} px-3 py-2.5 md:px-4 md:py-3 shadow-sm`}>
                    <p className="text-sm md:text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    
                    {message.cta && (
                      <motion.button
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => handleCTAClick(message.cta!)}
                        className="mt-2 md:mt-3 w-full flex items-center justify-center gap-1.5 md:gap-2 bg-gradient-to-r from-[#20B2AA] to-[#1A8F88] text-white font-semibold px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>{message.cta.text}</span>
                        <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-[18px] md:rounded-[20px] rounded-bl-md px-3 py-2.5 md:px-4 md:py-3 shadow-sm">
                    <div className="flex gap-1">
                      {[0, 0.15, 0.3].map((delay, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay }}
                          className="w-2 h-2 bg-[#20B2AA] rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <div className="border-t border-gray-200 p-3 md:p-4 bg-white shrink-0 safe-area-inset-bottom">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about TEAS 7..."
                  className="flex-1 px-3 py-2.5 md:px-4 md:py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#20B2AA] focus:ring-4 focus:ring-[#20B2AA]/10 outline-none transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-[#20B2AA] to-[#1A8F88] text-white rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
