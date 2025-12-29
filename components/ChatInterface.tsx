// Inside app/components/ChatInterface.tsx

// 1. Import the component
import { ShareCard } from './ShareCard';

// 2. Inside your message loop:
{messages.map((m) => (
  <div key={m.id} className={m.role === 'user' ? 'user-bubble' : 'ai-bubble'}>
    <p>{m.content}</p>
    
    {/* INSERT THIS BLOCK: Only show share button for AI responses */}
    {m.role === 'assistant' && (
      <ShareCard content={m.content} />
    )}
    
  </div>
))}