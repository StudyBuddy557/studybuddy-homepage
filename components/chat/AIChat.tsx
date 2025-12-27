"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  doc,
  setDoc,
  getDoc,
  Unsubscribe,
} from "firebase/firestore";

import {
  getChatMode,
  openTutorChat,
  closeChat,
} from "@/lib/chatOrchestrator";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Timestamp;
}

interface UserProfile {
  messageCount: number;
  lastInteraction: Timestamp;
  motivationLevel: "high" | "medium" | "low";
}

export default function AIChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const unsubscribeRef = useRef<Unsubscribe | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let sid = localStorage.getItem("studybuddy_session_id");
    if (!sid) {
      sid = `guest_${crypto.randomUUID()}`;
      localStorage.setItem("studybuddy_session_id", sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    if (getChatMode() === "tutor") {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    const initProfile = async () => {
      const ref = doc(db, "users", "guest", "profiles", sessionId);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          messageCount: 0,
          lastInteraction: Timestamp.now(),
          motivationLevel: "medium",
        } satisfies UserProfile);
      }
      setIsReady(true);
    };
    initProfile();
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId || !isReady) return;
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    const ref = collection(db, "users", "guest", "sessions", sessionId, "messages");
    const q = query(ref, orderBy("timestamp", "asc"));
    unsubscribeRef.current = onSnapshot(q, snap => {
      const list: Message[] = [];
      snap.forEach(d => list.push({ id: d.id, ...(d.data() as Message) }));
      setMessages(list);
      setIsTyping(false);
    });
    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, [sessionId, isReady]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;
    setIsTyping(true);
    const ref = collection(db, "users", "guest", "sessions", sessionId, "messages");
    await addDoc(ref, {
      role: "user",
      content: input.trim(),
      timestamp: Timestamp.now(),
      context: pathname,
    });
    setInput("");
  };

  const speak = async (text: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      cache: "no-store",
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => {
      URL.revokeObjectURL(url);
      audioRef.current = null;
    };
    audioRef.current = audio;
    await audio.play();
  };

  return (
    <>
      <button onClick={() => { openTutorChat(); setIsOpen(true); }} className="fixed bottom-4 right-4 z-50">
        <Image src="/StudyBuddy_AI_tutor_gif.gif" alt="AI Tutor" width={64} height={64} unoptimized />
      </button>
      {isOpen && isReady && (
        <div className="fixed bottom-6 right-6 w-96 h-[36rem] bg-white rounded-xl shadow-2xl flex flex-col z-50">
          <div className="p-4 bg-blue-600 text-white font-bold flex justify-between items-center">
            <span>StudyBuddy AI Tutor</span>
            <button onClick={() => { closeChat(); setIsOpen(false); }} className="text-sm opacity-80 hover:opacity-100">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={m.id ?? i} className={m.role === "user" ? "text-right" : ""}>
                <div className="inline-block bg-slate-100 p-3 rounded-lg">
                  {m.content}
                  {m.role === "assistant" && <button onClick={() => speak(m.content)} className="ml-2 text-xs text-blue-600">🔊</button>}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-slate-400">Tutor is typing…</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} className="flex-1 border rounded px-3 py-2" placeholder="Ask about TEAS, pricing, or strategy…" />
            <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded">Send</button>
          </div>
        </div>
      )}
    </>
  );
}