import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // 1. Save to Firebase
    await addDoc(collection(db, 'leads'), {
      email,
      source,
      createdAt: Timestamp.now(),
      status: 'new',
    });

    // 2. Add to MailerLite
    try {
      const mailerliteResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          fields: {
            source: source,
            lead_magnet: 'teas_study_guide',
          },
        }),
      });

      if (!mailerliteResponse.ok) {
        console.error('MailerLite error:', await mailerliteResponse.text());
      }
    } catch (mlError) {
      console.error('MailerLite API error:', mlError);
      // Continue even if MailerLite fails - we still have the lead in Firebase
    }

    return NextResponse.json({ 
      success: true,
      message: 'Lead captured successfully' 
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}
