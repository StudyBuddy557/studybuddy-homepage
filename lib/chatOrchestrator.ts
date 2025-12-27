// lib/chatOrchestrator.ts
// $1M-agency grade: single source of truth for all chat behavior

export type ChatMode = 'sales' | 'tutor' | null;

const STORAGE_KEY = 'studybuddy_active_chat';

export function getChatMode(): ChatMode {
  if (typeof window === 'undefined') return null;
  return (localStorage.getItem(STORAGE_KEY) as ChatMode) ?? null;
}

export function setChatMode(mode: ChatMode) {
  if (typeof window === 'undefined') return;
  if (mode === null) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, mode);
  }
}

export function openTutorChat() {
  // Tutor ALWAYS wins
  setChatMode('tutor');
}

export function openSalesChat() {
  const current = getChatMode();
  // Sales chat only allowed if tutor has never been opened
  if (current !== 'tutor') {
    setChatMode('sales');
  }
}

export function closeChat() {
  setChatMode(null);
}
