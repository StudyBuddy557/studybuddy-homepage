/**
 * Font Optimization Utilities
 * Optimal font loading strategies for performance
 * Last updated: 2026-01-04
 */

/**
 * Font display strategies
 * Controls how fonts are displayed during loading
 */
export const FONT_DISPLAY = {
  // Best for performance: show fallback immediately
  SWAP: 'swap',
  
  // Best for design: wait for font, show invisible text
  BLOCK: 'block',
  
  // Hybrid: show fallback after 100ms
  FALLBACK: 'fallback',
  
  // Show fallback immediately, swap when ready (within 3s)
  OPTIONAL: 'optional',
} as const;

/**
 * Font loading strategies for different font weights
 */
export const FONT_WEIGHTS = {
  // Only load weights you actually use
  MINIMAL: [400, 700], // Regular + Bold
  STANDARD: [400, 600, 700], // Regular + Semibold + Bold
  EXTENDED: [300, 400, 600, 700, 900], // Light + Regular + Semibold + Bold + Black
};

/**
 * Font subset recommendations
 * Load only the characters you need
 */
export const FONT_SUBSETS = {
  // English only (smallest)
  LATIN: 'latin',
  
  // English + Western European
  LATIN_EXT: 'latin-ext',
  
  // Add more as needed
  CYRILLIC: 'cyrillic',
  GREEK: 'greek',
};

/**
 * System font stack fallback
 * Ensures text is readable while web fonts load
 */
export const SYSTEM_FONT_STACK = [
  // Apple
  '-apple-system',
  'BlinkMacSystemFont',
  
  // Modern Windows
  'Segoe UI',
  
  // Android
  'Roboto',
  
  // Older systems
  'Helvetica Neue',
  'Arial',
  
  // Generic fallback
  'sans-serif',
].join(', ');

/**
 * Font face declaration for self-hosted fonts
 */
export function generateFontFace(
  family: string,
  weight: number,
  style: 'normal' | 'italic',
  filename: string,
  display: keyof typeof FONT_DISPLAY = 'SWAP'
): string {
  return `
    @font-face {
      font-family: '${family}';
      font-style: ${style};
      font-weight: ${weight};
      font-display: ${FONT_DISPLAY[display]};
      src: url('/fonts/${filename}.woff2') format('woff2'),
           url('/fonts/${filename}.woff') format('woff');
    }
  `.trim();
}

/**
 * Preload critical fonts
 * Add to <head> for fonts used above the fold
 */
export function preloadFont(filename: string, type: 'woff2' | 'woff' = 'woff2'): string {
  return `<link rel="preload" href="/fonts/${filename}.${type}" as="font" type="font/${type}" crossorigin="anonymous">`;
}

/**
 * Font optimization recommendations
 */
export const FONT_OPTIMIZATION_TIPS = {
  // 1. Use system fonts when possible
  useSystemFonts: true,
  
  // 2. Limit web fonts to 2-3 font families max
  maxFamilies: 3,
  
  // 3. Limit weights to only what you use
  maxWeights: 3,
  
  // 4. Use variable fonts for multiple weights
  preferVariableFonts: true,
  
  // 5. Self-host fonts when possible
  selfHost: true,
  
  // 6. Subset fonts to reduce file size
  subset: true,
  
  // 7. Preload critical fonts
  preloadCritical: true,
  
  // 8. Use font-display: swap
  useSwap: true,
};

/**
 * Calculate approximate font load time
 */
export function estimateFontLoadTime(
  fileSizeKB: number,
  connectionSpeedMbps: number = 4 // Assume 4G
): number {
  const fileSizeBits = fileSizeKB * 1024 * 8;
  const speedBitsPerSecond = connectionSpeedMbps * 1000000;
  const loadTimeSeconds = fileSizeBits / speedBitsPerSecond;
  
  return Math.ceil(loadTimeSeconds * 1000); // Return milliseconds
}

/**
 * Font loading performance budgets
 */
export const FONT_BUDGETS = {
  // Total font weight (all fonts combined)
  TOTAL_MAX_KB: 100, // 100KB total
  
  // Single font file
  SINGLE_MAX_KB: 30, // 30KB per file
  
  // Load time targets
  LOAD_TIME_MS: {
    EXCELLENT: 100,
    GOOD: 300,
    ACCEPTABLE: 500,
    POOR: 1000,
  },
};

/**
 * Check if font is within performance budget
 */
export function isWithinBudget(fileSizeKB: number): boolean {
  return fileSizeKB <= FONT_BUDGETS.SINGLE_MAX_KB;
}

/**
 * Font optimization for Next.js
 * Using next/font/google
 */
export const NEXT_FONT_CONFIG = {
  // Inter font (your current font)
  inter: {
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '600', '700'],
    preload: true,
    fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    variable: '--font-inter',
  },
};

export default {
  FONT_DISPLAY,
  FONT_WEIGHTS,
  FONT_SUBSETS,
  SYSTEM_FONT_STACK,
  generateFontFace,
  preloadFont,
  estimateFontLoadTime,
  isWithinBudget,
  FONT_BUDGETS,
  NEXT_FONT_CONFIG,
};
