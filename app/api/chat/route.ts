import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: No Gemini Key' }, 
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use 'gemini-pro' or 'gemini-1.5-flash' depending on what's available to your key
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const SYSTEM_PROMPT = `
      You are the **StudyBuddy AI Tutor – GOLD STANDARD EDITION**.
      Your goal is to help students master TEAS 7 content.
      
      PROTOCOL:
      1. Tone: Warm, encouraging, concise.
      2. Format: Use Markdown. Use LaTeX for math (wrap in $$ for display, $ for inline).
      3. Teaching Style: Step-by-step explanations.
      
      User Question: ${message}
    `;

    const result = await model.generateContent(SYSTEM_PROMPT);
    const response = await result.response;
    const reply = response.text();

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('Gemini Error:', error);
    return NextResponse.json(
      { error: `Gemini Failed: ${error.message}` }, 
      { status: 500 }
    );
  }
}