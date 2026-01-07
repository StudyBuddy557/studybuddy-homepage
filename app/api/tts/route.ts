import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

// ❌ OLD: Top-level init removed to prevent build crashes
// const openai = new OpenAI(...);

export async function POST(request: NextRequest) {
  try {
    // ✅ NEW: Initialize OpenAI inside the handler
    // This ensures it only runs when a request comes in, not during build
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ Missing OPENAI_API_KEY');
      return NextResponse.json({ error: 'Server Configuration Error' }, { status: 500 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { text, voice = 'onyx' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    console.log('🎙️ Generating TTS for:', text.substring(0, 50));

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice: voice,
      input: text,
      speed: 0.95
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    console.log('✅ TTS generated:', buffer.length, 'bytes');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });

  } catch (error) {
    console.error('❌ TTS API Error:', error);
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }
}