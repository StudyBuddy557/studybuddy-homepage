#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Pages to add schema to with their route and type
const pagesToUpdate = [
  { file: 'app/pricing/page.tsx', route: '/pricing', type: 'course' },
  { file: 'app/teas-reading-strategies/page.tsx', route: '/teas-reading-strategies', type: 'guide' },
  { file: 'app/teas-math-guide/page.tsx', route: '/teas-math-guide', type: 'guide' },
  { file: 'app/teas-science-guide/page.tsx', route: '/teas-science-guide', type: 'guide' },
  { file: 'app/compare/teas-prep-courses/page.tsx', route: '/compare/teas-prep-courses', type: 'compare' },
  { file: 'app/teas-7-syllabus/page.tsx', route: '/teas-7-syllabus', type: 'guide' },
  { file: 'app/teas-scoring-guide/page.tsx', route: '/teas-scoring-guide', type: 'guide' },
  { file: 'app/about/our-professors/page.tsx', route: '/about/our-professors', type: 'generic' },
  { file: 'app/is-studybuddy-legit/page.tsx', route: '/is-studybuddy-legit', type: 'generic' },
  { file: 'app/pass-guarantee/page.tsx', route: '/pass-guarantee', type: 'generic' },
];

const schemaImports = `import { buildJsonLdForPage } from '@/lib/schema/render';
import { findPageMapping } from '@/lib/teas/find-page';
`;

function addSchemaToPage(filePath, route, type) {
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${filePath} - file doesn't exist`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if schema already added
  if (content.includes('buildJsonLdForPage')) {
    console.log(`✅ ${filePath} - already has schema`);
    return false;
  }

  // Backup original file
  fs.writeFileSync(filePath + '.backup', content);

  try {
    // Add imports after the last import statement
    const lines = content.split('\n');
    let lastImportIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i;
      }
    }

    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, schemaImports);
    } else {
      lines.unshift(schemaImports);
    }

    content = lines.join('\n');

    // Find the export default function
    const functionMatch = content.match(/export default function \w+\([^)]*\)\s*{/);
    
    if (!functionMatch) {
      console.log(`⚠️  ${filePath} - couldn't find export default function`);
      return false;
    }

    const functionStart = functionMatch.index + functionMatch[0].length;

    // Insert schema generation code
    const schemaCode = `
  const mapping = findPageMapping('${route}');
  const jsonLd = mapping ? buildJsonLdForPage('${type}', { mapping }) : null;
`;

    content = content.slice(0, functionStart) + schemaCode + content.slice(functionStart);

    // Find return statement and add schema injection
    const returnMatch = content.match(/return\s*\(/);
    
    if (!returnMatch) {
      console.log(`⚠️  ${filePath} - couldn't find return statement`);
      return false;
    }

    const returnStart = returnMatch.index + returnMatch[0].length;
    
    // Check what's after return
    const afterReturn = content.slice(returnStart).trim();
    
    if (afterReturn.startsWith('<>')) {
      // Already has fragment, inject at the start
      const fragmentStart = returnStart + afterReturn.indexOf('<>') + 2;
      const schemaTag = `
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
`;
      content = content.slice(0, fragmentStart) + schemaTag + content.slice(fragmentStart);
    } else {
      // Need to wrap in fragment
      // Find matching closing paren
      let depth = 1;
      let closeIndex = returnStart;
      
      for (let i = returnStart; i < content.length; i++) {
        if (content[i] === '(') depth++;
        if (content[i] === ')') {
          depth--;
          if (depth === 0) {
            closeIndex = i;
            break;
          }
        }
      }

      const originalContent = content.slice(returnStart, closeIndex).trim();
      const wrappedContent = `
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      ${originalContent}
    </>
  `;

      content = content.slice(0, returnStart) + wrappedContent + content.slice(closeIndex);
    }

    fs.writeFileSync(filePath, content);
    console.log(`✅ ${filePath} - schema added successfully`);
    return true;
    
  } catch (error) {
    console.error(`❌ ${filePath} - error: ${error.message}`);
    // Restore from backup
    const backup = fs.readFileSync(filePath + '.backup', 'utf-8');
    fs.writeFileSync(filePath, backup);
    console.log(`   Restored from backup`);
    return false;
  }
}

console.log('🚀 Adding schema to pages...\n');

let successCount = 0;
let skipCount = 0;
let errorCount = 0;

pagesToUpdate.forEach(({ file, route, type }) => {
  const result = addSchemaToPage(file, route, type);
  if (result === true) successCount++;
  else if (result === false) skipCount++;
  else errorCount++;
});

console.log('\n📊 Summary:');
console.log(`   ✅ Added: ${successCount}`);
console.log(`   ⏭️  Skipped: ${skipCount}`);
console.log(`   ❌ Errors: ${errorCount}`);
console.log('\n✨ Done! Run "npm run dev" to test.');
console.log('💡 Tip: Backup files created with .backup extension');
