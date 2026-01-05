// app/api/generate-study-guide/route.ts
import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

export async function GET() {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Brand colors
    const tealColor = '#20B2AA';
    const darkGray = '#333333';
    const lightGray = '#666666';

    // Helper function to add header
    const addHeader = (title: string, pageNum: number) => {
      doc.setFillColor(32, 178, 170); // Teal
      doc.rect(0, 0, pageWidth, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin, 15);
      
      // Page number
      doc.setFontSize(10);
      doc.text(`Page ${pageNum}`, pageWidth - margin - 15, 15);
    };

    // Helper function to add footer
    const addFooter = () => {
      doc.setFontSize(9);
      doc.setTextColor(102, 102, 102);
      doc.text('Get unlimited practice at studybuddy.live', pageWidth / 2, pageHeight - 10, { align: 'center' });
    };

    // ============================================
    // PAGE 1: COVER PAGE
    // ============================================
    doc.setFillColor(32, 178, 170);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('TEAS 7', pageWidth / 2, 60, { align: 'center' });
    
    doc.setFontSize(24);
    doc.text('Study Guide', pageWidth / 2, 75, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Your Complete Reference for Test Success', pageWidth / 2, 90, { align: 'center' });
    
    // Content preview box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(30, 110, pageWidth - 60, 90, 3, 3, 'F');
    
    doc.setTextColor(51, 51, 51);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Inside This Guide:', 40, 125);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const coverItems = [
      '✓ Math Formulas Cheat Sheet',
      '✓ Science Quick Reference',
      '✓ Reading Comprehension Strategies',
      '✓ English Grammar Rules',
      '✓ Personalized Study Timeline Calculator'
    ];
    
    coverItems.forEach((item, index) => {
      doc.text(item, 45, 138 + (index * 10));
    });
    
    // Bottom text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('StudyBuddy', pageWidth / 2, pageHeight - 40, { align: 'center' });
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Your Path to Nursing School Starts Here', pageWidth / 2, pageHeight - 28, { align: 'center' });

    // ============================================
    // PAGE 2: MATH FORMULAS
    // ============================================
    doc.addPage();
    addHeader('Math Formulas Cheat Sheet', 2);
    
    let yPos = 35;
    doc.setTextColor(51, 51, 51);
    
    // Fractions
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Fractions', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const fractionFormulas = [
      'Add/Subtract: Find common denominator, then add/subtract numerators',
      'Multiply: (a/b) × (c/d) = (a×c)/(b×d)',
      'Divide: (a/b) ÷ (c/d) = (a/b) × (d/c)',
      'Simplify: Divide numerator and denominator by GCF'
    ];
    
    fractionFormulas.forEach(formula => {
      doc.text(`• ${formula}`, margin + 5, yPos);
      yPos += 6;
    });
    
    yPos += 5;
    
    // Percentages
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Percentages', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const percentFormulas = [
      'Decimal to %: Multiply by 100 (0.75 = 75%)',
      'Fraction to %: Divide top by bottom, multiply by 100',
      '% of a number: (percent ÷ 100) × number',
      '% increase: [(new - old) ÷ old] × 100',
      '% decrease: [(old - new) ÷ old] × 100'
    ];
    
    percentFormulas.forEach(formula => {
      doc.text(`• ${formula}`, margin + 5, yPos);
      yPos += 6;
    });
    
    yPos += 5;
    
    // Algebra
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Algebra Essentials', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const algebraFormulas = [
      'Order of Operations: PEMDAS (Parentheses, Exponents, Multiply/Divide, Add/Subtract)',
      'Solve for x: Isolate variable using inverse operations',
      'Distributive: a(b + c) = ab + ac',
      'Combine like terms: 3x + 5x = 8x',
      'Slope formula: m = (y₂ - y₁) ÷ (x₂ - x₁)'
    ];
    
    algebraFormulas.forEach(formula => {
      doc.text(`• ${formula}`, margin + 5, yPos);
      yPos += 6;
    });
    
    yPos += 5;
    
    // Ratios & Proportions
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Ratios & Proportions', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const ratioFormulas = [
      'Ratio: Comparison of two numbers (3:4 or 3/4)',
      'Proportion: Two ratios are equal (a/b = c/d)',
      'Cross multiply to solve: If a/b = c/d, then ad = bc',
      'Unit rate: Ratio with denominator of 1'
    ];
    
    ratioFormulas.forEach(formula => {
      doc.text(`• ${formula}`, margin + 5, yPos);
      yPos += 6;
    });
    
    yPos += 5;
    
    // Measurement Conversions
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Common Conversions', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const conversions = [
      '1 foot = 12 inches | 1 yard = 3 feet',
      '1 pound = 16 ounces | 1 ton = 2,000 pounds',
      '1 cup = 8 fl oz | 1 pint = 2 cups | 1 quart = 2 pints | 1 gallon = 4 quarts',
      '1 meter = 100 cm | 1 km = 1,000 m',
      '1 kg = 1,000 g | 1 L = 1,000 mL'
    ];
    
    conversions.forEach(conv => {
      doc.text(`• ${conv}`, margin + 5, yPos);
      yPos += 6;
    });
    
    addFooter();

    // ============================================
    // PAGE 3: SCIENCE QUICK REFERENCE
    // ============================================
    doc.addPage();
    addHeader('Science Quick Reference', 3);
    
    yPos = 35;
    
    // Human Body Systems
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Human Body Systems', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const bodySystems = [
      'Circulatory: Heart, blood vessels, blood (transports O₂, nutrients)',
      'Respiratory: Lungs, trachea, bronchi (gas exchange)',
      'Digestive: Stomach, intestines, liver (breaks down food)',
      'Nervous: Brain, spinal cord, nerves (controls body functions)',
      'Skeletal: Bones, joints (support, protection, movement)',
      'Muscular: Skeletal, smooth, cardiac muscles (movement)',
      'Endocrine: Glands, hormones (regulates body processes)',
      'Immune/Lymphatic: White blood cells, lymph nodes (defense)',
      'Urinary: Kidneys, bladder (removes waste, balances fluids)'
    ];
    
    bodySystems.forEach(system => {
      const lines = doc.splitTextToSize(`• ${system}`, contentWidth - 5);
      lines.forEach((line: string) => {
        doc.text(line, margin + 5, yPos);
        yPos += 5;
      });
    });
    
    yPos += 3;
    
    // Cell Biology
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Cell Biology Basics', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const cellBiology = [
      'Nucleus: Contains DNA, controls cell activities',
      'Mitochondria: Powerhouse, produces ATP (energy)',
      'Ribosomes: Protein synthesis',
      'Cell membrane: Controls what enters/exits cell',
      'Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂',
      'Cellular respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP'
    ];
    
    cellBiology.forEach(item => {
      const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
      lines.forEach((line: string) => {
        doc.text(line, margin + 5, yPos);
        yPos += 5;
      });
    });
    
    yPos += 3;
    
    // Chemistry Essentials
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Chemistry Essentials', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const chemistry = [
      'Atom: Smallest unit of element (protons, neutrons, electrons)',
      'Molecule: Two or more atoms bonded together',
      'pH scale: 0-6 acidic, 7 neutral, 8-14 basic',
      'Covalent bond: Atoms share electrons',
      'Ionic bond: Atoms transfer electrons',
      'States of matter: Solid, liquid, gas, plasma'
    ];
    
    chemistry.forEach(item => {
      doc.text(`• ${item}`, margin + 5, yPos);
      yPos += 5;
    });
    
    yPos += 3;
    
    // Genetics
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Genetics Quick Facts', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const genetics = [
      'DNA: Deoxyribonucleic acid, contains genetic instructions',
      'Gene: Segment of DNA that codes for a trait',
      'Chromosome: DNA wrapped around proteins (humans have 46)',
      'Dominant allele: Expressed when present (capital letter)',
      'Recessive allele: Only expressed when two copies (lowercase)',
      'Genotype: Genetic makeup (Aa) | Phenotype: Physical trait (brown eyes)'
    ];
    
    genetics.forEach(item => {
      const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
      lines.forEach((line: string) => {
        doc.text(line, margin + 5, yPos);
        yPos += 5;
      });
    });
    
    addFooter();

    // ============================================
    // PAGE 4: READING STRATEGIES
    // ============================================
    doc.addPage();
    addHeader('Reading Comprehension Strategies', 4);
    
    yPos = 35;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('Master these 6 question patterns to ace the Reading section:', margin, yPos);
    yPos += 10;
    
    const readingStrategies = [
      {
        title: '1. Main Idea Questions',
        strategy: 'Strategy: Read first & last paragraph first. Main idea is usually stated in opening or conclusion.',
        tip: 'Look for: "The passage is primarily about..." or "The main purpose is..."'
      },
      {
        title: '2. Supporting Detail Questions',
        strategy: 'Strategy: Scan for keywords from the question. Answer is directly stated in passage.',
        tip: 'Look for: "According to the passage..." or "The author states..."'
      },
      {
        title: '3. Inference Questions',
        strategy: 'Strategy: Answer must be supported by passage but not directly stated. Use context clues.',
        tip: 'Look for: "It can be inferred..." or "The passage suggests..."'
      },
      {
        title: '4. Vocabulary in Context',
        strategy: 'Strategy: Replace the word with answer choices. Which makes sense in the sentence?',
        tip: 'Look for: "As used in line X, the word means..."'
      },
      {
        title: '5. Author\'s Purpose/Tone',
        strategy: 'Strategy: Why did author write this? To inform, persuade, entertain, or describe?',
        tip: 'Tone words: objective (factual), critical, supportive, neutral, concerned'
      },
      {
        title: '6. Text Structure',
        strategy: 'Strategy: How is passage organized? Chronological, cause/effect, compare/contrast, problem/solution?',
        tip: 'Look for transition words: "however," "therefore," "in contrast," "as a result"'
      }
    ];
    
    readingStrategies.forEach((item, index) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(item.title, margin, yPos);
      yPos += 6;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const strategyLines = doc.splitTextToSize(item.strategy, contentWidth - 5);
      strategyLines.forEach((line: string) => {
        doc.text(line, margin + 3, yPos);
        yPos += 5;
      });
      
      doc.setFont('helvetica', 'italic');
      const tipLines = doc.splitTextToSize(item.tip, contentWidth - 5);
      tipLines.forEach((line: string) => {
        doc.text(line, margin + 3, yPos);
        yPos += 5;
      });
      
      yPos += 4;
    });
    
    yPos += 2;
    
    // Pro Tips Box
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(margin, yPos, contentWidth, 25, 2, 2, 'F');
    yPos += 6;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('📚 Pro Tips:', margin + 3, yPos);
    yPos += 6;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('• Always read the question before the passage to know what to look for', margin + 3, yPos);
    yPos += 4;
    doc.text('• Eliminate obviously wrong answers first to improve your odds', margin + 3, yPos);
    yPos += 4;
    doc.text('• Time yourself: Spend no more than 7-8 minutes per passage', margin + 3, yPos);
    
    addFooter();

    // ============================================
    // PAGE 5: ENGLISH GRAMMAR & STUDY TIMELINE
    // ============================================
    doc.addPage();
    addHeader('English Grammar Rules', 5);
    
    yPos = 35;
    
    // Punctuation
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Punctuation Rules', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const punctuation = [
      'Comma: Use in lists, after introductory phrases, before coordinating conjunctions (FANBOYS)',
      'Semicolon: Joins two independent clauses; also separates items in complex lists',
      'Colon: Introduces a list, explanation, or quote (must follow independent clause)',
      'Apostrophe: Shows possession (Sarah\'s book) or contractions (it\'s = it is)',
      'Dash: Creates emphasis—like this—or shows interruption'
    ];
    
    punctuation.forEach(rule => {
      const lines = doc.splitTextToSize(`• ${rule}`, contentWidth - 5);
      lines.forEach((line: string) => {
        doc.text(line, margin + 5, yPos);
        yPos += 5;
      });
    });
    
    yPos += 3;
    
    // Sentence Structure
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Sentence Structure', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const sentenceStructure = [
      'Subject-Verb Agreement: Singular subject = singular verb (He walks), Plural = plural (They walk)',
      'Fragment: Incomplete thought, missing subject or verb (Incorrect: "Running to the store.")',
      'Run-on: Two independent clauses without proper punctuation (Fix with period, semicolon, or comma + FANBOYS)',
      'Modifier placement: Place modifiers next to what they modify to avoid confusion',
      'Parallel structure: Keep items in a list in the same grammatical form'
    ];
    
    sentenceStructure.forEach(rule => {
      const lines = doc.splitTextToSize(`• ${rule}`, contentWidth - 5);
      lines.forEach((line: string) => {
        doc.text(line, margin + 5, yPos);
        yPos += 5;
      });
    });
    
    yPos += 3;
    
    // Common Errors
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Common Errors to Avoid', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const commonErrors = [
      'Their/There/They\'re: Their = possession, There = place, They\'re = they are',
      'Its/It\'s: Its = possession, It\'s = it is',
      'Your/You\'re: Your = possession, You\'re = you are',
      'Affect/Effect: Affect = verb (to influence), Effect = noun (result)',
      'Than/Then: Than = comparison, Then = time sequence'
    ];
    
    commonErrors.forEach(rule => {
      const lines = doc.splitTextToSize(`• ${rule}`, contentWidth - 5);
      lines.forEach((line: string) => {
        doc.text(line, margin + 5, yPos);
        yPos += 5;
      });
    });
    
    yPos += 8;
    
    // Study Timeline Calculator
    doc.setFillColor(32, 178, 170);
    doc.rect(margin, yPos, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('📅 Study Timeline Calculator', margin + 3, yPos + 5.5);
    
    yPos += 13;
    doc.setTextColor(51, 51, 51);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Calculate your study schedule based on your test date:', margin, yPos);
    yPos += 8;
    
    const studyTimeline = [
      { weeks: '12+ weeks out', hours: '5-7 hours/week', focus: 'Build foundation, cover all topics systematically' },
      { weeks: '8-12 weeks out', hours: '8-10 hours/week', focus: 'Practice tests, identify weak areas' },
      { weeks: '4-8 weeks out', hours: '10-15 hours/week', focus: 'Targeted review, timed practice exams' },
      { weeks: '2-4 weeks out', hours: '15-20 hours/week', focus: 'Final review, memorize formulas, take full practice tests' },
      { weeks: '1-2 weeks out', hours: '10-12 hours/week', focus: 'Light review, rest, stay confident' }
    ];
    
    studyTimeline.forEach(item => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${item.weeks}:`, margin + 2, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(`${item.hours}`, margin + 32, yPos);
      yPos += 5;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      const focusLines = doc.splitTextToSize(item.focus, contentWidth - 35);
      focusLines.forEach((line: string) => {
        doc.text(line, margin + 5, yPos);
        yPos += 4;
      });
      doc.setFontSize(10);
      yPos += 2;
    });
    
    addFooter();

    // Generate PDF as buffer
    const pdfBuffer = doc.output('arraybuffer');
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="TEAS-7-Study-Guide-StudyBuddy.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}