# StudyBuddy Marketing Homepage - Gold Standard Foundation

High-performance Next.js 14 marketing homepage optimized for **Mobile Lighthouse 100** and **LCP < 1.2s**.

## 🎯 Performance Goals

- **Mobile Lighthouse Score**: 100
- **LCP (Largest Contentful Paint)**: < 1.2s
- **Architecture**: React Server Components (RSC) by default
- **Interactive Islands**: Client components only where necessary

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS 3.4
- **Font**: Inter (via next/font/google)
- **Hosting**: Vercel-ready

### File Structure
```
studybuddy-homepage/
├── app/
│   ├── layout.tsx          # Root layout with optimized font loading
│   ├── page.tsx             # Homepage (Server Component)
│   └── globals.css          # Tailwind + custom styles
├── components/
│   ├── hero/
│   │   ├── Hero.tsx         # Hero section (Server Component)
│   │   └── VideoPlayer.tsx  # Lazy video (Client Component)
│   └── ui/
│       └── Button.tsx       # Reusable button component
├── lib/
│   └── utils.ts             # cn() utility for class merging
├── scripts/
│   └── verify-perf.sh       # Performance verification script
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── package.json
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Type Check
```bash
npm run type-check
```

### 4. Build for Production
```bash
npm run build
```

### 5. Run Production Server
```bash
npm start
```

## 🔍 Performance Verification

Run the automated Lighthouse audit:

```bash
./scripts/verify-perf.sh
```

This script will:
1. ✅ Build the Next.js application
2. ✅ Start production server on port 3000
3. ✅ Wait for server readiness
4. ✅ Install Lighthouse CLI (if needed)
5. ✅ Run mobile Lighthouse audit
6. ✅ Display performance metrics
7. ✅ Clean up server process automatically

**Reports are saved to**: `./lighthouse-reports/`

## 🎨 Brand Guidelines

### Colors (Strict)
```typescript
Primary Teal:  #00A9B7  // Trust, medical authority
Badge Yellow:  #FFC700  // Attention, achievement
Text Dark:     #1F2937  // Primary text
Text Light:    #F9FAFB  // Light backgrounds
```

### Typography
- **Font Family**: Inter (system fallback)
- **Display**: Swap (prevents FOIT)
- **Preload**: Enabled for critical font files

## ⚡ Performance Optimizations

### LCP Strategy
- **LCP Element**: Hero poster image (not video)
- **Image Optimization**: `next/image` with `priority={true}`
- **Sizes**: `100vw` for full viewport width
- **Format**: AVIF/WebP with automatic format selection

### Video Handling
- **Load Timing**: After LCP paint via `requestIdleCallback`
- **Attributes**: `preload="none"`, `muted`, `playsInline`
- **Fallback**: Graceful degradation if autoplay blocked

### Critical CSS
- Inlined via Tailwind's JIT compiler
- No blocking external stylesheets

### Font Loading
- `display: swap` prevents invisible text
- Preconnect to CDN domains
- System font fallbacks

## ♿ Accessibility

### Touch Targets
- **Minimum Size**: 44x44px (WCAG AAA)
- **Utility Class**: `.touch-target`

### Focus Management
- **Visible Focus**: 2px outline with offset
- **Focus-Visible**: Enhanced keyboard navigation
- **No Outline Removal**: Focus always visible for keyboard users

### Contrast
- **Text/Background**: WCAG AAA compliant
- **Interactive Elements**: Minimum 4.5:1 contrast ratio

### Semantic HTML
- Proper heading hierarchy
- ARIA labels where needed
- `alt` text for all images

## 📦 Dependencies

### Core
- `next@14.2.15` - React framework
- `react@18.3.1` - UI library
- `typescript@5.6.3` - Type safety

### Styling
- `tailwindcss@3.4.14` - Utility-first CSS
- `clsx@2.1.1` - Conditional classes
- `tailwind-merge@2.5.4` - Class conflict resolution

### Icons
- `lucide-react@0.454.0` - Icon library (if needed)

## 🔧 Configuration Files

### `next.config.mjs`
- Image optimization settings
- Remote patterns for CDN
- Compression enabled
- Security headers

### `tailwind.config.ts`
- Brand color tokens
- Custom utilities
- Minimum touch target sizes

### `tsconfig.json`
- Strict mode enabled
- Path aliases (`@/*`)
- No implicit any

## 📝 TypeScript Rules

- ❌ **No `any` types allowed**
- ✅ All component props must have explicit interfaces
- ✅ Strict null checks enabled
- ✅ No unused variables/parameters

## 🎯 Component Patterns

### Server Components (Default)
```tsx
// app/page.tsx
export default function HomePage(): JSX.Element {
  // No useState, useEffect, or event handlers
  return <div>Server-rendered content</div>;
}
```

### Client Components (When Needed)
```tsx
'use client';

// components/hero/VideoPlayer.tsx
export default function VideoPlayer(): JSX.Element {
  const [state, setState] = useState();
  // Interactive logic here
}
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Environment Variables
Add to `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://studybuddy.live
```

## 📊 Success Metrics

- ✅ Lighthouse Performance: 100
- ✅ LCP: < 1.2s
- ✅ FCP: < 1.0s
- ✅ TBT: < 200ms
- ✅ CLS: < 0.1

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Use Server Components by default
3. Add `'use client'` only when necessary
4. Maintain brand color palette
5. Ensure 44px minimum touch targets
6. Test with Lighthouse before committing

## 📄 License

Proprietary - StudyBuddy Platform

---

**Built with ⚡ for nursing students by Rahul**

