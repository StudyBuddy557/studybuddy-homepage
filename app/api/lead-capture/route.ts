import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Lazy load Firebase only at runtime
    const { db } = await import('@/lib/firebase');
    const { collection, addDoc, Timestamp } = await import('firebase/firestore');
    
    const { email, source } = await req.json();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    
    // Save to Firebase
    await addDoc(collection(db, 'leads'), {
      email,
      source,
      createdAt: Timestamp.now(),
      status: 'new',
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}
