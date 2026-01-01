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

function checkSchemaInFile(filePath: string): { found: boolean; method: string } {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      return { found: false, method: 'file not found' };
    }
    
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    // Check for inline JSON-LD script
    if (content.includes('application/ld+json')) {
      return { found: true, method: 'inline JSON-LD' };
    }
    
    // Check for Next.js jsonLd pattern
    if (content.includes('jsonLd')) {
      return { found: true, method: 'Next.js jsonLd' };
    }
    
    // Check for Schema component import AND usage
    const hasSchemaImport = content.includes("from '@/components/Schema'") || 
                           content.includes('from "@/components/Schema"') ||
                           content.includes("from '../components/Schema'") ||
                           content.includes('from "../components/Schema"');
    
    const hasSchemaUsage = content.includes('<Schema') || content.includes('<Schema>');
    
    if (hasSchemaImport && hasSchemaUsage) {
      return { found: true, method: 'Schema component' };
    }
    
    // Check for schema function imports (getOrganizationSchema, etc.)
    const hasSchemaFunctionImport = content.includes('getOrganizationSchema') || 
                                    content.includes('getProductSchema') ||
                                    content.includes('Schema');
    
    if (hasSchemaFunctionImport && hasSchemaUsage) {
      return { found: true, method: 'Schema component with functions' };
    }
    
    return { found: false, method: 'none detected' };
  } catch (e) {
    return { found: false, method: 'error reading file' };
  }
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
  const schemaCheck = checkSchemaInFile('app/page.tsx');
  if (schemaCheck.found) {
    console.log(`✅ FOUND:   Schema markup in app/page.tsx (${schemaCheck.method})`);
    foundCount++;
  } else {
    console.log(`❌ MISSING: No schema markup detected in app/page.tsx (${schemaCheck.method})`);
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