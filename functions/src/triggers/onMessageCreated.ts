import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';
import { generateAIResponse } from '../services/aiService';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

export const onMessageCreated = onDocumentCreated(
  {
    document: 'users/{userId}/sessions/{sessionId}/messages/{messageId}',
    region: 'us-central1',
    memory: '512MiB',
    timeoutSeconds: 60,
    secrets: ['OPENAI_API_KEY'],
  },
  async (event) => {
    console.log('🤖 Cloud Function triggered!');
    
    const snapshot = event.data;
    if (!snapshot) {
      console.log('❌ No snapshot data');
      return;
    }

    const message = snapshot.data();
    const { userId, sessionId, messageId } = event.params;

    console.log('📩 New message:', { userId, sessionId, role: message.role });

    if (message.role !== 'user') {
      console.log('⏭️  Skipping non-user message');
      return;
    }

    try {
      const historySnapshot = await db
        .collection(`users/${userId}/sessions/${sessionId}/messages`)
        .orderBy('timestamp', 'desc')
        .limit(10)
        .get();

      console.log(`📚 Fetched ${historySnapshot.docs.length} messages`);

      const conversationHistory = historySnapshot.docs
        .map(doc => {
          const data = doc.data();
          return { 
            role: data.role as 'user' | 'assistant',
            content: data.content 
          };
        })
        .reverse();

      console.log('🧠 Calling OpenAI...');

      const aiResponseContent = await generateAIResponse(conversationHistory);

      console.log('✅ AI response received');

      await db.collection(`users/${userId}/sessions/${sessionId}/messages`).add({
        role: 'assistant',
        content: aiResponseContent,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        relatedMessageId: messageId
      });

      console.log('💾 Response saved to Firestore');

    } catch (error) {
      console.error(`❌ Error:`, error);
      
      await db.collection(`users/${userId}/sessions/${sessionId}/messages`).add({
        role: 'assistant',
        content: "Sorry, I'm having trouble right now. Can you try asking again? 😅",
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        isError: true
      });
    }
  }
);