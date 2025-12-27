'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/lib/hooks/useChat';
import { cn } from '@/lib/utils';
import { Send, User, Bot, Loader2 } from 'lucide-react'; // Make sure to install lucide-react

interface ChatInterfaceProps {
  userId: string;
  tier: 'free' | 'basic' | 'pro';
}

export function ChatInterface({ userId, tier }: ChatInterfaceProps) {
  const { messages, loading, error, sendMessage } = useChat({ userId });
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendMessage(input);
      setInput(''); // Clear input on success
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">{error}</div>;
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p className="mb-2">👋 Hi! I'm your StudyBuddy AI.</p>
            <p className="text-sm">Ask me anything about the TEAS exam!</p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex w-full",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "flex max-w-[80%] rounded-lg px-4 py-2 text-sm shadow-sm",
                msg.role === 'user'
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              )}
            >
              {/* Optional Icons */}
              <div className="mr-2 mt-0.5 shrink-0 opacity-70">
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}
        
        {/* Invisible element to scroll to */}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isSending}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </form>
        {tier === 'free' && (
           <p className="text-xs text-center text-gray-400 mt-2">
             Free tier: Limited to 5 questions/day. <a href="/pricing" className="underline hover:text-blue-600">Upgrade to Pro</a>
           </p>
        )}
      </div>
    </div>
  );
}