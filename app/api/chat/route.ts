import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';

function isMCQ(message: string): boolean {
  const mcqPatterns = [
    /\b[A-D]\)\s/i,
    /\b[A-D]\.\s/i,
    /\bchoice\s*[A-D]/i,
    /\boption\s*[A-D]/i,
    /\(A\)|\(B\)|\(C\)|\(D\)/i,
  ];
  
  return mcqPatterns.some(pattern => pattern.test(message));
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const isMultipleChoice = isMCQ(message);
    
    let prompt = '';
    
    if (isMultipleChoice) {
      prompt = `🚨 CRITICAL INSTRUCTION - FOLLOW EXACTLY 🚨

The student pasted a multiple choice question. You MUST NOT reveal the answer.

NEVER say:
- "The answer is..."
- "The correct answer is..."
- "Option X is correct"
- Do NOT evaluate each choice
- Do NOT identify which option is right

INSTEAD, do this:
1. Say: "I see you have a practice question! Let me teach you the concept instead of giving the answer."
2. Explain the UNDERLYING CONCEPT (e.g., if asking about mitosis, explain what mitosis is)
3. Give a strategy: "To solve questions like this, look for..."
4. End with: "Now try solving it yourself using what you learned! 💪"

Student's question:
${message}

Remember: TEACH the concept, DON'T reveal the answer!`;
    } else {
      prompt = `You are StudyBuddy AI Tutor for TEAS 7 exam prep.

Tone: Warm, encouraging, concise
Format: Use Markdown. LaTeX for math (wrap in $$ for display)
Teaching: Step-by-step explanations

Question: ${message}`;
    }

    const result = await model.generateContent(prompt);
    const reply = result.response.text();
    
    return NextResponse.json({ reply, isMCQ: isMultipleChoice });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
