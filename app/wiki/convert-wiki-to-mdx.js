const fs = require('fs');
const path = require('path');

// Import your existing wiki data
const { wikiData } = require('./lib/wiki-data.ts');

const WIKI_DIR = path.join(process.cwd(), 'content/wiki');

// Ensure directory exists
if (!fs.existsSync(WIKI_DIR)) {
  fs.mkdirSync(WIKI_DIR, { recursive: true });
}

// Convert each entry to MDX
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
console.log(`📁 Files created in: ${WIKI_DIR}`);