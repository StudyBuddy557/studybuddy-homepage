#!/bin/bash

# StudyBuddy Project Cleanup Script
# Review each section before running!
# Run from your project root: ./cleanup-studybuddy.sh

set -e  # Exit on error

echo "🧹 StudyBuddy Cleanup Script"
echo "============================"
echo ""

# -----------------------------------------
# SECTION 1: Delete obvious clutter
# -----------------------------------------
echo "📁 Section 1: Removing clutter files..."

# Old node_modules backup
rm -rf node_modules_OLD

# Duplicate/debug files in root
rm -f "firebase-debug 2.log"
rm -f "package-lock 3.json"
rm -f app-code.zip
rm -f chromewebdata_2025-12-10_07-47-49.report.html

# Backup files
rm -f app/wiki/page.tsx.backup
rm -f "app/wiki/[slug]/page.tsx.backup"

echo "✅ Clutter files removed"
echo ""

# -----------------------------------------
# SECTION 2: Clean up functions folder
# -----------------------------------------
echo "📁 Section 2: Cleaning functions folder..."

rm -f "functions/firebase-debug 2.log"
rm -f "functions/lib/aiTutor 2.js"
rm -f "functions/lib/index.js 2.map"
rm -f "functions/lib/aiTutor.js 2.map"
rm -f "functions/lib/index 2.js"

echo "✅ Functions folder cleaned"
echo ""

# -----------------------------------------
# SECTION 3: Consolidate scripts
# -----------------------------------------
echo "📁 Section 3: Consolidating scripts..."

# Move root convert script to scripts folder, remove duplicate
mv -f convert-wiki-to-mdx.js scripts/convert-wiki-to-mdx.js 2>/dev/null || true
rm -f app/wiki/convert-wiki-to-mdx.js

echo "✅ Scripts consolidated"
echo ""

# -----------------------------------------
# SECTION 4: Merge app/components into /components
# -----------------------------------------
echo "📁 Section 4: Merging app/components into /components..."

# Move MobileNav (doesn't exist in /components/layout/)
mv -f app/components/layout/MobileNav.tsx components/layout/MobileNav.tsx 2>/dev/null || true

# The rest are duplicates - we'll keep the /components versions
# and delete the /app/components versions

# Remove duplicates (keeping /components/ versions)
rm -f app/components/StartChatButton.tsx
rm -f app/components/ChatInterface.tsx
rm -f app/components/Schema.tsx
rm -f app/components/schools/StatsGrid.tsx
rm -f app/components/schools/SchoolSearch.tsx

# Remove the duplicate schema file (keep one version)
rm -f app/components/schema/OrganizationJsonLd.tsx

# Clean up empty directories
rmdir app/components/schema 2>/dev/null || true
rmdir app/components/schools 2>/dev/null || true
rmdir app/components/layout 2>/dev/null || true
rmdir app/components 2>/dev/null || true

echo "✅ Components merged"
echo ""

# -----------------------------------------
# SECTION 5: Remove .DS_Store files
# -----------------------------------------
echo "📁 Section 5: Removing .DS_Store files..."

find . -name ".DS_Store" -delete 2>/dev/null || true

echo "✅ .DS_Store files removed"
echo ""

# -----------------------------------------
# MANUAL REVIEW REQUIRED
# -----------------------------------------
echo "⚠️  MANUAL REVIEW REQUIRED:"
echo ""
echo "1. DUPLICATE FUNCTIONS FOLDERS:"
echo "   You have both /functions/ and /studybuddy-functions/"
echo "   Check firebase.json to see which is active, delete the other."
echo ""
echo "2. DUPLICATE LEGAL PAGES:"
echo "   - /app/privacy/ and /app/privacy-policy/"
echo "   - /app/terms/ and /app/terms-and-conditions/"
echo "   Keep one of each, add redirects for the others in next.config.mjs"
echo ""
echo "3. DUPLICATE SCHEMA FILES in /components/:"
echo "   - /components/schema/OrganizationSchema.tsx"
echo "   - /components/json-ld/OrganizationSchema.tsx"
echo "   - /components/Schema.tsx"
echo "   Review and consolidate into one approach."
echo ""
echo "4. UPDATE IMPORTS:"
echo "   After running this script, search your codebase for any imports"
echo "   from 'app/components/' and update them to 'components/'"
echo ""
echo "   Run: grep -r \"from ['\\\"].*app/components\" app/"
echo ""
echo "🎉 Cleanup complete! Run 'npm run build' to check for broken imports."
