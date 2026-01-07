import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { messages, messageCount } = await req.json();
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  
  let response = "";
  let cta = null;
  
  // TEAS acronym
  if (lastMessage.includes('what does teas stand') || lastMessage.includes('what is teas')) {
    response = "TEAS stands for Test of Essential Academic Skills - it's what nursing schools use to find students who'll succeed in their programs. Over 1,000 schools require it now. What aspect of the test are you most curious about?";
  }
  // SPECIFIC MATH TOPICS - Detailed breakdown
  else if ((lastMessage.includes('math') || lastMessage.includes('mathematics')) && 
           (lastMessage.includes('topics') || lastMessage.includes('covers') || lastMessage.includes('specific') || lastMessage.includes('what is on'))) {
    response = "Math covers four areas: (1) Numbers & Algebra - fractions, decimals, percentages, ratios, algebraic equations, (2) Measurement - conversions, metric system, (3) Data Interpretation - charts, graphs, tables, statistics, (4) Geometry - perimeter, area, volume. The trickiest? Most students say algebra and data interpretation. How's your comfort level with these?";
  }
  // SPECIFIC SCIENCE TOPICS
  else if ((lastMessage.includes('science') || lastMessage.includes('biology')) && 
           (lastMessage.includes('topics') || lastMessage.includes('covers') || lastMessage.includes('specific') || lastMessage.includes('what is on'))) {
    response = "Science breaks into: (1) Human Anatomy & Physiology - body systems, organs, (2) Biology - cells, genetics, evolution, (3) Chemistry - atoms, periodic table, chemical reactions, (4) Scientific Reasoning - experimental design, data analysis. Anatomy is usually the biggest chunk. Which area feels most challenging to you?";
  }
  // SPECIFIC READING TOPICS
  else if ((lastMessage.includes('reading') || lastMessage.includes('comprehension')) && 
           (lastMessage.includes('topics') || lastMessage.includes('covers') || lastMessage.includes('specific') || lastMessage.includes('what is on'))) {
    response = "Reading tests: (1) Key Ideas & Details - main idea, supporting details, (2) Craft & Structure - author's purpose, tone, word choice, (3) Integration of Knowledge - comparing texts, using evidence. Fun fact: they use passages from science journals and instruction manuals, not just stories. Which type of reading do you find trickiest?";
  }
  // SPECIFIC ENGLISH TOPICS
  else if ((lastMessage.includes('english') || lastMessage.includes('grammar') || lastMessage.includes('language')) && 
           (lastMessage.includes('topics') || lastMessage.includes('covers') || lastMessage.includes('specific') || lastMessage.includes('what is on'))) {
    response = "English covers: (1) Conventions of Standard English - grammar, punctuation, sentence structure, (2) Knowledge of Language - word choice, style, (3) Vocabulary - spelling, word meaning, context clues. Most points are in grammar and punctuation - very learnable rules! What's your biggest grammar concern?";
  }
  // Math question count
  else if (lastMessage.includes('math') && (lastMessage.includes('how many') || lastMessage.includes('questions'))) {
    response = "34 math questions covering algebra, data interpretation, numbers, and measurement. Most students tell us algebra is the trickiest part. We've got 1,200+ practice problems that mirror the real test. How's your math confidence right now?";
  }
  // Science question count
  else if (lastMessage.includes('science') && (lastMessage.includes('how many') || lastMessage.includes('questions'))) {
    response = "50 questions - it's the biggest section and covers biology, chemistry, anatomy, and physiology. I know it sounds like a lot! The good news? Our students say the organized lessons make it way less overwhelming than they expected. When are you planning to test?";
  }
  // Reading question count
  else if (lastMessage.includes('reading') && (lastMessage.includes('how many') || lastMessage.includes('questions'))) {
    response = "39 reading questions. Here's what most people don't know: TEAS reading tests the same 6 patterns over and over. Once you learn them, the section becomes predictable. Our practice passages teach you exactly what to look for. Got your test scheduled yet?";
  }
  // English question count
  else if (lastMessage.includes('english') && (lastMessage.includes('how many') || lastMessage.includes('questions'))) {
    response = "37 questions on grammar, spelling, and punctuation. Honestly? This is where students pick up the easiest points. The rules are clear-cut, and with the right prep you can nearly ace this section. Have you registered for the TEAS yet?";
  }
  // General questions count
  else if (lastMessage.includes('how many questions') || lastMessage.includes('number of questions')) {
    response = "170 total questions (150 scored, 20 unscored pretest items they're evaluating). Here's the breakdown: Reading 39, Math 34, Science 50, English 37. You get 209 minutes, which is about 54 seconds per question. With our 4,000+ practice questions, you'll be way faster than that. When's your test date?";
  }
  // Calculator
  else if (lastMessage.includes('calculator')) {
    response = "Yes, you get a basic 4-function calculator for math. Pro tip: some problems are actually faster with mental math, and knowing when to use which is part of our strategy training. Are you more worried about math or one of the other sections?";
  }
  // Time limit
  else if (lastMessage.includes('how long') || lastMessage.includes('time limit') || lastMessage.includes('duration')) {
    response = "209 minutes (3 hours 29 minutes). I know that sounds tight, but here's what matters: our timed practice exams train you to pace perfectly. Most students finish with 20+ minutes to spare by test day. How soon are you testing?";
  }
  // Sections overview
  else if (lastMessage.includes('what is on') || lastMessage.includes('whats on') || lastMessage.includes('sections') || lastMessage.includes('subjects')) {
    response = "Four sections: Reading (39Q) - comprehension and inference. Math (34Q) - algebra and data. Science (50Q) - anatomy, biology, chemistry. English (37Q) - grammar and language. We cover every single topic tested. Which section worries you most?";
  }
  // Passing score
  else if (lastMessage.includes('passing score') || lastMessage.includes('what score') || lastMessage.includes('need to pass')) {
    response = "It varies by program - most want 60-75%, competitive ones want 75-85%. Our students average 78.3%, which beats the national average by 13 points and gets them into their top choice schools. What program are you aiming for?";
  }
  // Difficulty
  else if (lastMessage.includes('hard') || lastMessage.includes('difficult')) {
    response = "Real talk? It's challenging - they designed it that way. But here's what matters: 92% of our students pass on their first attempt. The difference isn't talent, it's preparation. Students who use TEAS-specific practice (not just generic study) score 18% higher on average. How much time do you have to prep?";
  }
  // Retake policy
  else if (lastMessage.includes('retake') || lastMessage.includes('fail') || lastMessage.includes('take again')) {
    response = "You can retake the TEAS, but there's a waiting period (usually 30 days) and programs see all your scores. That's why getting it right the first time matters! Our pass guarantee with Pro means if you do the work and don't pass, you get a full refund. When's your first attempt?";
  }
  // Study time needed
  else if (lastMessage.includes('how long to study') || lastMessage.includes('how much time') || lastMessage.includes('weeks to prepare')) {
    response = "Most students need 6-12 weeks of consistent study (10-15 hours/week). If you're testing sooner, it's doable but requires more intensity. Our adaptive learning tracks your progress and tells you exactly where you stand. How much time do you have before your test?";
  }
  // Content teaching - redirect to AI tutor
  else if (lastMessage.includes('how do i') || lastMessage.includes('how to solve') || lastMessage.includes('explain') || lastMessage.includes('teach me')) {
    response = "I love the question! That's exactly what our AI tutor does - he gives detailed explanations with examples, adapts to your learning style, and is available 24/7. Let me help you get access - when's your test?";
  }
  // Pricing
  else if (lastMessage.includes('cost') || lastMessage.includes('price') || lastMessage.includes('how much') || lastMessage.includes('plans')) {
    response = "Two options: Basic ($24.99/month, cancel anytime) if you've got 3+ months. Pro ($59 for 3 months) if you're testing sooner - includes unlimited AI tutoring and our pass guarantee. Most students who are serious about passing their first try go Pro. When's your test?";
  }
  // DATE DETECTION
  else if (/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/.test(lastMessage)) {
    const dayMatch = lastMessage.match(/\b(\d{1,2})(st|nd|rd|th)?\b/);
    const day = dayMatch ? parseInt(dayMatch[1]) : 15;
    
    if (day < 1 || day > 31) {
      response = "I didn't quite catch that date - could you write it like 'March 15' or 'April 20'? Want to make sure I recommend the right plan for your timeline.";
    } else {
      const now = new Date();
      const currentMonth = now.getMonth();
      
      let examMonth = -1;
      if (lastMessage.includes('jan')) examMonth = 0;
      else if (lastMessage.includes('feb')) examMonth = 1;
      else if (lastMessage.includes('mar')) examMonth = 2;
      else if (lastMessage.includes('apr')) examMonth = 3;
      else if (lastMessage.includes('may')) examMonth = 4;
      else if (lastMessage.includes('jun')) examMonth = 5;
      else if (lastMessage.includes('jul')) examMonth = 6;
      else if (lastMessage.includes('aug')) examMonth = 7;
      else if (lastMessage.includes('sep')) examMonth = 8;
      else if (lastMessage.includes('oct')) examMonth = 9;
      else if (lastMessage.includes('nov')) examMonth = 10;
      else if (lastMessage.includes('dec')) examMonth = 11;
      
      let monthsAway = examMonth - currentMonth;
      if (monthsAway < 0) monthsAway += 12;
      
      if (monthsAway === 0) {
        response = `Wow, that's coming up fast! With unlimited AI tutoring, our Pro students study 40% more efficiently than self-study. The pass guarantee means if you do the work and don't pass, you get every penny back. That's how confident we are. Ready to start?`;
        cta = { type: 'checkout', text: 'Get Pro - Pass Guaranteed', url: 'https://learn.studybuddy.live/subscription/59-3-months?site_template_id=67e1717114d4688062090ad2', primary: true };
      } else if (monthsAway < 3) {
        response = `Okay, ${monthsAway} month${monthsAway > 1 ? 's' : ''} out. That's actually perfect timing with focused prep. Pro gives you unlimited AI help (huge for last-minute questions) plus the pass guarantee. Most students in your timeframe choose this. Sound good?`;
        cta = { type: 'checkout', text: 'Start Pro - $59 for 3 months', url: 'https://learn.studybuddy.live/subscription/59-3-months?site_template_id=67e1717114d4688062090ad2', primary: true };
      } else {
        response = `Nice, you've got ${monthsAway} months - that's plenty of time to master this. Basic ($24.99/month, cancel anytime) is perfect for your timeline. Study at your own pace, and if you want to upgrade to unlimited AI later, you can. Want to get started?`;
        cta = { type: 'checkout', text: 'Start Basic - $24.99/mo', url: 'https://learn.studybuddy.live/subscription/2499?site_template_id=67e1717114d4688062090ad2', primary: true };
      }
    }
  }
  // FALLBACK - Direct to support for specific questions
  else {
    response = "That's a great question! For detailed questions like that, our support team can give you a thorough answer. Email them at support@studybuddy.live and they'll get back to you within a few hours. In the meantime, is there anything about the test format, timing, or which study plan fits your timeline that I can help with?";
  }
  
  if (!cta && messageCount >= 4) {
    cta = { type: 'checkout', text: 'View Plans & Pricing', url: '/pricing', primary: false };
  }
  
  return NextResponse.json({ response, cta });
}
