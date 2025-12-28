// scripts/audit-aeo.ts
import fs from 'fs';
import path from 'path';

// The 12 Core AEO Pages defined in your strategy
const REQUIRED_PAGES = [
  'app/teas-7-syllabus/page.tsx',
  'app/pass-rate-methodology/page.tsx',
  'app/compare/teas-prep-courses/page.tsx',
  'app/ai-tutor/page.tsx',
  'app/about/our-professors/page.tsx',
  'app/is-studybuddy-legit/page.tsx',
  'app/pass-guarantee/page.tsx',
  'app/teas-math-guide/page.tsx',
  'app/teas-scoring-guide/page.tsx',
  'app/teas-study-plan-2-weeks/page.tsx',
  'app/teas-science-guide/page.tsx',
  'app/teas-reading-strategies/page.tsx'
];

// The Schema Infrastructure
const SCHEMA_INFRA = [
  'lib/schema/index.ts',
  'lib/schema/organization.ts',
  'components/Schema.tsx'
];

function checkFile(filePath: string): boolean {
  const fullPath = path.join(process.cwd(), filePath);
  return fs.existsSync(fullPath);
}

function audit() {
  console.log('\n🔍 STARTING AEO ASSET AUDIT...\n');
  
  let missingCount = 0;
  let foundCount = 0;

  console.log('--- Checking Core Pages ---');
  REQUIRED_PAGES.forEach(page => {
    if (checkFile(page)) {
      console.log(`✅ FOUND:   ${page}`);
      foundCount++;
    } else {
      console.log(`❌ MISSING: ${page}`);
      missingCount++;
    }
  });

  console.log('\n--- Checking Schema Infrastructure ---');
  SCHEMA_INFRA.forEach(file => {
    if (checkFile(file)) {
      console.log(`✅ FOUND:   ${file}`);
      foundCount++;
    } else {
      console.log(`❌ MISSING: ${file}`);
      missingCount++;
    }
  });

  console.log('\n--- Checking Homepage Schema ---');
  try {
    const homepagePath = path.join(process.cwd(), 'app/page.tsx');
    if (fs.existsSync(homepagePath)) {
        const homepage = fs.readFileSync(homepagePath, 'utf-8');
        // checking for common schema indicators
        if (homepage.includes('application/ld+json') || homepage.includes('jsonLd') || homepage.includes('<Schema')) {
          console.log('✅ FOUND:   Schema markup in app/page.tsx');
          foundCount++;
        } else {
          console.log('❌ MISSING: No schema markup detected in app/page.tsx');
          missingCount++;
        }
    } else {
        console.log('❌ MISSING: app/page.tsx does not exist!');
        missingCount++;
    }
  } catch (e) {
    console.log('❌ ERROR:   Could not read app/page.tsx');
    missingCount++;
  }

  console.log('\n=============================');
  console.log(`RESULTS: ${foundCount} Found, ${missingCount} Missing`);
  
  if (missingCount > 0) {
    console.log('\n⚠️  CRITICAL: AEO ASSETS ARE MISSING LOCALLY.');
    console.log('   Action: Run "git reflog" to find the commit before your revert.');
  } else {
    console.log('\n✅ LOCAL INTEGRITY VERIFIED. You can safely re-deploy.');
  }
}

audit();