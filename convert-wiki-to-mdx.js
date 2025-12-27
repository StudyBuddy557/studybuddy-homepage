const fs = require('fs');
const path = require('path');

const wikiData = [
  { 
    slug: "mitosis", 
    term: "Mitosis", 
    category: "Science",
    definition: "A part of the cell cycle when replicated chromosomes are separated into two new nuclei. Cell division gives rise to genetically identical cells in which the number of chromosomes is maintained.",
    teas_context: "The TEAS requires you to know the order of stages: Prophase, Metaphase, Anaphase, Telophase (PMAT).",
    related_terms: ["Meiosis", "Cell Cycle", "Cytokinesis"]
  },
  { 
    slug: "ph-scale", 
    term: "pH Scale", 
    category: "Science",
    definition: "A numeric scale used to specify the acidity or basicity of an aqueous solution. It is roughly the negative of the logarithm to base 10 of the activity of the hydrogen ion.",
    teas_context: "Expect questions asking if a value (e.g., 3.0) is acidic or basic. Remember: Below 7 is acidic, above 7 is basic.",
    related_terms: ["Acid", "Base", "Buffer"]
  },
  { 
    slug: "metric-conversions", 
    term: "Metric Conversions", 
    category: "Math",
    definition: "The process of changing a measure from one unit to another within the metric system (e.g., kilograms to grams).",
    teas_context: "A guaranteed question type. Memorize 'King Henry Died By Drinking Chocolate Milk' (Kilo, Hecto, Deka, Base, Deci, Centi, Milli).",
    related_terms: ["Dimensional Analysis", "Volume", "Mass"]
  },
  { 
    slug: "ratios-and-proportions", 
    term: "Ratios and Proportions", 
    category: "Math",
    definition: "A ratio is a comparison of two quantities. A proportion is an equation stating that two ratios are equal.",
    teas_context: "Used frequently in dosage calculation questions. You must solve for X (e.g., if 5ml = 10mg, how many ml is 25mg?).",
    related_terms: ["Cross Multiplication", "Fractions", "Dosage Calc"]
  },
  { 
    slug: "subject-verb-agreement", 
    term: "Subject-Verb Agreement", 
    category: "English",
    definition: "The grammatical rule that the subject and verb must agree in number (singular or plural).",
    teas_context: "A very common error spot. Watch out for collective nouns like 'team' or 'family' which usually take singular verbs.",
    related_terms: ["Pronouns", "Antecedents", "Grammar"]
  },
  { 
    slug: "complex-sentence", 
    term: "Complex Sentence", 
    category: "English",
    definition: "A sentence that contains an independent clause and one or more dependent clauses.",
    teas_context: "You will be asked to identify sentence structures. Look for subordinating conjunctions like 'although', 'because', or 'since'.",
    related_terms: ["Simple Sentence", "Compound Sentence", "Conjunctions"]
  }
];

const WIKI_DIR = path.join(process.cwd(), 'content/wiki');

if (!fs.existsSync(WIKI_DIR)) {
  fs.mkdirSync(WIKI_DIR, { recursive: true });
}

wikiData.forEach(entry => {
  const mdxContent = `---
title: ${entry.term}
category: ${entry.category}
definition: ${entry.definition}
teas_context: ${entry.teas_context}
related_terms:
${entry.related_terms.map(term => `  - ${term}`).join('\n')}
---

# ${entry.term}

${entry.definition}

## On the TEAS 7 Exam

${entry.teas_context}

## Related Concepts

${entry.related_terms.map(term => `- **${term}**`).join('\n')}
`;

  const filePath = path.join(WIKI_DIR, `${entry.slug}.mdx`);
  fs.writeFileSync(filePath, mdxContent);
  console.log(`✅ Created: ${entry.slug}.mdx`);
});

console.log(`\n🎉 Successfully converted ${wikiData.length} entries to MDX!`);
