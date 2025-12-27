"use client";

import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase"; 
import { collection, doc } from "firebase/firestore";

export default function StartChatButton() {
  const router = useRouter();

  const startNewChat = async () => {
    // 1. Hardcoded user for now (later this comes from Auth)
    const userId = "test-user"; 
    
    // 2. Generate a random Session ID using Firestore's built-in algo
    const newSessionRef = doc(collection(db, "users", userId, "sessions"));
    
    // 3. Redirect to the dynamic chat page
    router.push(`/chat/${newSessionRef.id}`);
  };

  return (
    <button 
      onClick={startNewChat}
      className="bg-[#2563EB] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex justify-center items-center"
    >
      <span>Try AI Tutor Now</span>
      <span className="ml-2">→</span>
    </button>
  );
}