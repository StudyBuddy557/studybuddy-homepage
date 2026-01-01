#!/bin/bash

# ============================================================
# STUDYBUDDY.LIVE - FULL SYSTEM AUDIT SCRIPT
# ============================================================
# Run this from your project root in VS Code terminal:
#   chmod +x studybuddy-audit.sh && ./studybuddy-audit.sh
# ============================================================

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          STUDYBUDDY.LIVE - SYSTEM AUDIT REPORT               ║"
echo "║                    $(date '+%Y-%m-%d %H:%M')                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASS=0
FAIL=0
WARN=0

check_pass() {
    echo -e "  ${GREEN}✓${NC} $1"
    ((PASS++))
}

check_fail() {
    echo -e "  ${RED}✗${NC} $1"
    ((FAIL++))
}

check_warn() {
    echo -e "  ${YELLOW}⚠${NC} $1"
    ((WARN++))
}

check_info() {
    echo -e "  ${BLUE}ℹ${NC} $1"
}

# ============================================================
# 1. PROJECT STRUCTURE
# ============================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📁 1. PROJECT STRUCTURE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if we're in a Next.js project
if [ -f "package.json" ]; then
    check_pass "package.json found"
    
    # Check for Next.js
    if grep -q '"next"' package.json; then
        check_pass "Next.js detected"
        NEXTJS_VERSION=$(grep '"next"' package.json | head -1 | sed 's/.*: *"\([^"]*\)".*/\1/')
        check_info "Next.js version: $NEXTJS_VERSION"
    else
        check_fail "Next.js not found in dependencies"
    fi
else
    check_fail "package.json not found - are you in the project root?"
    echo ""
    echo "Run this script from your StudyBuddy project root directory."
    exit 1
fi

# Check for app directory (Next.js 13+ App Router)
if [ -d "app" ]; then
    check_pass "app/ directory found (App Router)"
elif [ -d "src/app" ]; then
    check_pass "src/app/ directory found (App Router)"
else
    check_warn "No app/ directory - using Pages Router?"
fi

# ============================================================
# 2. CORE PAGES
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📄 2. CORE PAGES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

PAGES=(
    "app/page.tsx:Homepage/Landing"
    "app/dashboard/page.tsx:Student Dashboard"
    "app/pricing/page.tsx:Pricing Page"
    "app/diagnostic/page.tsx:Diagnostic Quiz"
    "app/login/page.tsx:Login Page"
    "app/signup/page.tsx:Signup Page"
)

for page_info in "${PAGES[@]}"; do
    IFS=':' read -r path name <<< "$page_info"
    if [ -f "$path" ]; then
        check_pass "$name ($path)"
    else
        check_warn "$name NOT FOUND ($path)"
    fi
done

# ============================================================
# 3. COMPONENTS
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧩 3. COMPONENTS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for AIChat component in multiple possible locations
AICHAT_FOUND=false
AICHAT_LOCATIONS=(
    "app/components/chat/AIChat.tsx"
    "components/chat/AIChat.tsx"
    "src/components/chat/AIChat.tsx"
)

for loc in "${AICHAT_LOCATIONS[@]}"; do
    if [ -f "$loc" ]; then
        check_pass "AIChat component ($loc)"
        AICHAT_FOUND=true
        
        # Check if it has Firebase integration
        if grep -q "firebase" "$loc" || grep -q "firestore" "$loc"; then
            check_pass "  └─ Firebase integration detected"
        else
            check_warn "  └─ No Firebase integration (static mockup?)"
        fi
        
        # Check for tier/rate limiting
        if grep -q "dailyLimit\|TIER_LIMITS\|questionsUsed" "$loc"; then
            check_pass "  └─ Rate limiting logic detected"
        else
            check_warn "  └─ No rate limiting detected"
        fi
        
        break
    fi
done

if [ "$AICHAT_FOUND" = false ]; then
    check_fail "AIChat component NOT FOUND"
fi

# Check for other key components
OTHER_COMPONENTS=(
    "components/ui:UI Components (shadcn)"
    "components/Navigation:Navigation"
    "components/Footer:Footer"
)

for comp_info in "${OTHER_COMPONENTS[@]}"; do
    IFS=':' read -r path name <<< "$comp_info"
    if [ -d "$path" ] || [ -f "${path}.tsx" ] || [ -f "${path}/index.tsx" ]; then
        check_pass "$name"
    else
        check_info "$name not found (optional)"
    fi
done

# ============================================================
# 4. FIREBASE CONFIGURATION
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔥 4. FIREBASE CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for Firebase config
FIREBASE_CONFIG_LOCATIONS=(
    "lib/firebase.ts"
    "src/lib/firebase.ts"
    "firebase.ts"
    "config/firebase.ts"
)

FIREBASE_FOUND=false
for loc in "${FIREBASE_CONFIG_LOCATIONS[@]}"; do
    if [ -f "$loc" ]; then
        check_pass "Firebase config ($loc)"
        FIREBASE_FOUND=true
        
        # Check exports
        if grep -q "export.*db\|export const db\|export { db" "$loc"; then
            check_pass "  └─ Firestore (db) exported"
        else
            check_warn "  └─ Firestore (db) not exported"
        fi
        
        if grep -q "export.*auth\|export const auth" "$loc"; then
            check_pass "  └─ Auth exported"
        else
            check_info "  └─ Auth not exported (optional)"
        fi
        break
    fi
done

if [ "$FIREBASE_FOUND" = false ]; then
    check_fail "Firebase config NOT FOUND"
fi

# Check for firebase.json (deployment config)
if [ -f "firebase.json" ]; then
    check_pass "firebase.json (deployment config)"
else
    check_warn "firebase.json not found"
fi

# Check for functions directory
if [ -d "functions" ]; then
    check_pass "functions/ directory"
    
    if [ -f "functions/src/index.ts" ]; then
        check_pass "  └─ functions/src/index.ts"
    elif [ -f "functions/index.js" ]; then
        check_pass "  └─ functions/index.js"
    else
        check_warn "  └─ No main functions file found"
    fi
    
    # Check for onMessageCreated trigger
    if grep -r "onMessageCreated\|onDocumentCreated" functions/ 2>/dev/null | grep -q .; then
        check_pass "  └─ Chat trigger function detected"
    else
        check_warn "  └─ Chat trigger function not found"
    fi
else
    check_fail "functions/ directory NOT FOUND"
fi

# ============================================================
# 5. API ROUTES
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔌 5. API ROUTES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

API_ROUTES=(
    "app/api/tts/route.ts:TTS (Text-to-Speech)"
    "app/api/chat/route.ts:Chat API"
    "app/api/auth/route.ts:Auth API"
    "app/api/webhook/route.ts:Webhook (LearnWorlds)"
)

for route_info in "${API_ROUTES[@]}"; do
    IFS=':' read -r path name <<< "$route_info"
    if [ -f "$path" ]; then
        check_pass "$name ($path)"
    else
        check_info "$name not found ($path)"
    fi
done

# ============================================================
# 6. ENVIRONMENT VARIABLES
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 6. ENVIRONMENT VARIABLES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f ".env.local" ]; then
    check_pass ".env.local exists"
    
    # Check for required env vars (without exposing values)
    ENV_VARS=(
        "NEXT_PUBLIC_FIREBASE_API_KEY"
        "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
        "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
        "OPENAI_API_KEY"
    )
    
    for var in "${ENV_VARS[@]}"; do
        if grep -q "^${var}=" .env.local 2>/dev/null; then
            check_pass "  └─ $var is set"
        else
            check_warn "  └─ $var NOT SET"
        fi
    done
else
    check_fail ".env.local NOT FOUND"
    check_info "Create .env.local with your Firebase and OpenAI keys"
fi

if [ -f ".env.example" ]; then
    check_pass ".env.example exists (template)"
fi

# ============================================================
# 7. STATIC ASSETS
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🖼️  7. STATIC ASSETS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

ASSETS=(
    "public/logo.png:Logo"
    "public/StudyBuddy_AI_tutor_Avatar.png:AI Tutor Avatar"
    "public/favicon.ico:Favicon"
)

for asset_info in "${ASSETS[@]}"; do
    IFS=':' read -r path name <<< "$asset_info"
    if [ -f "$path" ]; then
        check_pass "$name ($path)"
    else
        check_warn "$name NOT FOUND ($path)"
    fi
done

# ============================================================
# 8. DEPENDENCIES CHECK
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 8. KEY DEPENDENCIES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

DEPS=(
    "firebase:Firebase SDK"
    "lucide-react:Lucide Icons"
    "tailwindcss:Tailwind CSS"
    "openai:OpenAI SDK"
)

for dep_info in "${DEPS[@]}"; do
    IFS=':' read -r dep name <<< "$dep_info"
    if grep -q "\"$dep\"" package.json 2>/dev/null; then
        VERSION=$(grep "\"$dep\"" package.json | head -1 | sed 's/.*: *"\([^"]*\)".*/\1/')
        check_pass "$name ($VERSION)"
    else
        check_warn "$name not in package.json"
    fi
done

# Check if node_modules exists
if [ -d "node_modules" ]; then
    check_pass "node_modules/ exists"
else
    check_fail "node_modules/ NOT FOUND - run: npm install"
fi

# ============================================================
# 9. IMPORT CHAIN VALIDATION
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔗 9. IMPORT CHAIN VALIDATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if dashboard imports AIChat
DASHBOARD_FILE=""
if [ -f "app/dashboard/page.tsx" ]; then
    DASHBOARD_FILE="app/dashboard/page.tsx"
elif [ -f "src/app/dashboard/page.tsx" ]; then
    DASHBOARD_FILE="src/app/dashboard/page.tsx"
fi

if [ -n "$DASHBOARD_FILE" ]; then
    if grep -q "AIChat" "$DASHBOARD_FILE"; then
        check_pass "Dashboard imports AIChat"
    else
        check_warn "Dashboard does NOT import AIChat"
    fi
fi

# Check if AIChat imports Firebase
if [ "$AICHAT_FOUND" = true ]; then
    for loc in "${AICHAT_LOCATIONS[@]}"; do
        if [ -f "$loc" ]; then
            if grep -q "from.*firebase\|from '@/lib/firebase'" "$loc"; then
                check_pass "AIChat imports Firebase config"
            else
                check_warn "AIChat does NOT import Firebase"
            fi
            break
        fi
    done
fi

# ============================================================
# 10. BUILD TEST
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🏗️  10. QUICK BUILD CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check TypeScript config
if [ -f "tsconfig.json" ]; then
    check_pass "tsconfig.json exists"
else
    check_warn "tsconfig.json not found"
fi

# Check for path aliases
if [ -f "tsconfig.json" ] && grep -q '"@/*"' tsconfig.json; then
    check_pass "Path alias @/* configured"
else
    check_info "No @/* path alias (imports use relative paths)"
fi

echo ""
echo -e "${BLUE}To run a full build test:${NC} npm run build"
echo -e "${BLUE}To start dev server:${NC} npm run dev"

# ============================================================
# SUMMARY
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 AUDIT SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "  ${GREEN}✓ Passed:${NC}  $PASS"
echo -e "  ${YELLOW}⚠ Warnings:${NC} $WARN"
echo -e "  ${RED}✗ Failed:${NC}  $FAIL"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  🎉 ALL CRITICAL CHECKS PASSED!${NC}"
    echo -e "${GREEN}══════════════════════════════════════════════════════════════${NC}"
else
    echo -e "${RED}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${RED}  ⚠️  $FAIL CRITICAL ISSUE(S) NEED ATTENTION${NC}"
    echo -e "${RED}══════════════════════════════════════════════════════════════${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 NEXT STEPS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Fix any ✗ FAILED items above"
echo "2. Run: npm run build (check for TypeScript errors)"
echo "3. Run: npm run dev (test locally)"
echo "4. Test the AI chat: send a message, verify Firestore"
echo "5. Deploy: firebase deploy --only functions"
echo "6. Deploy: vercel --prod (or your hosting provider)"
echo ""
