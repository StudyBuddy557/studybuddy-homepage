// app/components/dashboard/AITutorCard.tsx
'use client';

export default function AITutorCard() {
  const handleOpenChat = () => {
    // Attempt to find common chat widget triggers
    // LearnWorlds often uses specific IDs or window objects
    const chatWidget = document.getElementById('chat-widget-trigger');
    
    if (chatWidget) {
      chatWidget.click();
    } else {
      console.warn('Chat widget trigger not found. Check the ID in app/layout.tsx');
      // Fallback: Alert user or redirect to a help page
      // alert("Chat widget is loading. Please try again in a moment.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-1">
      <div className="relative z-10">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
           AI Tutor
        </h3>
        <p className="text-teal-100 text-sm mb-4">Stuck on a concept? Ask the AI tutor for a breakdown.</p>
      </div>
      
      <button 
        onClick={handleOpenChat}
        // GTM Tracking Attribute
        data-event="open-ai-tutor"
        className="relative z-10 w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/50 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
      >
        Open Chat
      </button>
      
      {/* Decorative Circle */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-teal-600 rounded-full opacity-50" />
    </div>
  );
}