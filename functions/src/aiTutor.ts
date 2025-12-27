import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

// Initialize Firebase Admin (if not already done in index.ts)
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// Initialize AI Client
// Ensure GEMINI_API_KEY is set in your .env or Firebase config
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Flash is fast & cheap for chat

// Validation Schema
const ChatRequestSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  message: z.string().min(1, "Message cannot be empty"),
  history: z.array(z.object({
    role: z.enum(["user", "model"]),
    parts: z.string()
  })).optional() // Optional chat history for context
});

export const aiTutor = functions.https.onCall(async (data, context) => {
  // 1. Validate Input
  const parseResult = ChatRequestSchema.safeParse(data);
  if (!parseResult.success) {
    throw new functions.https.HttpsError(
      "invalid-argument", 
      "Invalid input data", 
      parseResult.error.flatten()
    );
  }
  
  const { userId, message, history } = parseResult.data;

  try {
    // 2. Check User Subscription & Usage Limits
    const userRef = db.collection("users").doc(userId);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      // Graceful fallback for first-time users not yet synced from LearnWorlds
      return { 
        response: "I can't find your subscription details. Please refresh or contact support.",
        limitReached: true 
      };
    }

    const userData = userSnap.data();
    const isPro = userData?.tier === "TEAS_PRO"; // Matches product IDs in prompt pattern
    
    // Check daily usage (reset logic should be handled by a scheduled function, 
    // but here we check the counter)
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const lastUsageDate = userData?.lastUsageDate || today;
    let usageToday = userData?.aiUsageToday || 0;

    // Reset counter if it's a new day
    if (lastUsageDate !== today) {
      usageToday = 0;
    }

    // ENFORCE LIMIT: Core users get 10 messages/day
    if (!isPro && usageToday >= 10) {
      return {
        response: "You've reached your daily AI limit. Upgrade to TEAS Pro for unlimited tutoring!",
        limitReached: true,
        isPro: false
      };
    }

    // 3. Construct System Prompt (The "Professor" Persona)
    const systemPrompt = `
      You are StudyBuddy, an expert nursing professor helping a student prepare for the TEAS 7 exam.
      - Tone: Encouraging, professional, authoritative but accessible.
      - Constraints: Keep answers concise (mobile-friendly). Focus ONLY on TEAS 7 material.
      - If the student asks about HESI or NCLEX, remind them we currently focus on TEAS.
    `;

    // 4. Call the AI
    const chat = model.startChat({
      history: history ? history.map(h => ({
        role: h.role,
        parts: [{ text: h.parts }]
      })) : [],
      systemInstruction: systemPrompt,
    });

    const result = await chat.sendMessage(message);
    const aiResponse = result.response.text();

    // 5. Update Usage Stats in Firestore
    await userRef.update({
      aiUsageToday: usageToday + 1,
      totalAiUsage: admin.firestore.FieldValue.increment(1),
      lastUsageDate: today
    });

    return { 
      response: aiResponse,
      limitReached: false,
      isPro: !!isPro
    };

  } catch (error) {
    console.error("AI Tutor Logic Error:", error);
    throw new functions.https.HttpsError("internal", "My brain is tired. Please try again in a moment.");
  }
});