import { useState, useEffect, useRef } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Ensure this exists

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Timestamp | null; // null for immediate local writes
  isOptimistic?: boolean; // To gray out messages while sending
}

interface UseChatProps {
  userId: string;
  sessionId?: string; // Optional: separate chat threads
}

export function useChat({ userId, sessionId = 'default' }: UseChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to prevent "double-effect" issues in React 18 strict mode
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // 1. Subscribe to Real-time Updates
  useEffect(() => {
    if (!userId) {
        setLoading(false);
        return;
    }

    const messagesRef = collection(db, 'users', userId, 'sessions', sessionId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    setLoading(true);
    
    // Set up listener
    unsubscribeRef.current = onSnapshot(q, 
      (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Message[];
        
        setMessages(msgs);
        setLoading(false);
      },
      (err) => {
        console.error("Chat Error:", err);
        setError("Failed to load chat history.");
        setLoading(false);
      }
    );

    // Cleanup on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [userId, sessionId]);

  // 2. Send Message Function
  const sendMessage = async (content: string) => {
    if (!content.trim() || !userId) return;

    const messagesRef = collection(db, 'users', userId, 'sessions', sessionId, 'messages');

    try {
      // Add to Firestore
      await addDoc(messagesRef, {
        role: 'user',
        content: content.trim(),
        createdAt: serverTimestamp(), // Let server set the time
      });
      // Note: We don't need to manually update state here because 
      // the onSnapshot listener above will trigger instantly.
    } catch (err) {
      console.error("Send Error:", err);
      setError("Failed to send message. Please try again.");
      throw err;
    }
  };

  return { messages, loading, error, sendMessage };
}