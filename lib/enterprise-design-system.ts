/**
 * ENTERPRISE DESIGN SYSTEM
 * Premium tokens for $5M agency-level UI
 * Inspired by: Linear, Stripe, Apple
 */

export const DESIGN_TOKENS = {
  // 🎨 COLORS - Premium gradients and depth
  colors: {
    // Brand - Medical Teal with depth
    brand: {
      50: '#E6F7F7',
      100: '#B3E8E8',
      200: '#80D9D9',
      300: '#4DCACA',
      400: '#20B2AA',  // Primary
      500: '#1A8F88',
      600: '#146D66',
      700: '#0E4A44',
      800: '#082722',
      900: '#041311',
    },
    
    // Accent - Trust Blue
    accent: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',  // Primary
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
    
    // Neutrals - Sophisticated grays
    neutral: {
      0: '#FFFFFF',
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0A0A0A',
    },
    
    // Semantic
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // 📏 SPACING - 8px grid system
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },
  
  // 🔤 TYPOGRAPHY - Professional hierarchy
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, monospace',
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
      base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  // 🎭 SHADOWS - Depth and elevation
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(32, 178, 170, 0.3)',
    glowHover: '0 0 30px rgba(32, 178, 170, 0.5)',
  },
  
  // 🎬 ANIMATIONS - Buttery smooth
  animation: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
  
  // 📐 BORDERS
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',
  },
  
  // 🔲 LAYOUT
  layout: {
    maxWidth: '1280px',
    chatWidth: '640px',
    sidebarWidth: '320px',
  },
} as const;

// 🎯 COMPONENT VARIANTS
export const COMPONENT_STYLES = {
  // Chat bubble variants
  chatBubble: {
    user: `
      bg-gradient-to-br from-[${DESIGN_TOKENS.colors.accent[500]}] to-[${DESIGN_TOKENS.colors.accent[600]}]
      text-white
      rounded-[24px] rounded-br-sm
      shadow-md
      px-4 py-3
      max-w-[80%]
      ml-auto
    `,
    assistant: `
      bg-gradient-to-br from-white to-[${DESIGN_TOKENS.colors.neutral[50]}]
      text-[${DESIGN_TOKENS.colors.neutral[900]}]
      border border-[${DESIGN_TOKENS.colors.neutral[200]}]
      rounded-[24px] rounded-bl-sm
      shadow-sm
      px-4 py-3
      max-w-[80%]
      mr-auto
    `,
  },
  
  // Button variants
  button: {
    primary: `
      bg-gradient-to-r from-[${DESIGN_TOKENS.colors.brand[400]}] to-[${DESIGN_TOKENS.colors.brand[500]}]
      hover:from-[${DESIGN_TOKENS.colors.brand[500]}] hover:to-[${DESIGN_TOKENS.colors.brand[600]}]
      text-white font-semibold
      px-6 py-3 rounded-xl
      shadow-lg hover:shadow-xl
      transition-all duration-200
      hover:scale-[1.02] active:scale-[0.98]
    `,
    secondary: `
      bg-white
      hover:bg-[${DESIGN_TOKENS.colors.neutral[50]}]
      text-[${DESIGN_TOKENS.colors.neutral[900]}]
      border-2 border-[${DESIGN_TOKENS.colors.neutral[200]}]
      font-semibold
      px-6 py-3 rounded-xl
      shadow-sm hover:shadow-md
      transition-all duration-200
      hover:scale-[1.02] active:scale-[0.98]
    `,
    ghost: `
      bg-transparent
      hover:bg-[${DESIGN_TOKENS.colors.neutral[100]}]
      text-[${DESIGN_TOKENS.colors.neutral[700]}]
      font-medium
      px-4 py-2 rounded-lg
      transition-all duration-150
    `,
  },
  
  // Input variants
  input: {
    default: `
      bg-white
      border-2 border-[${DESIGN_TOKENS.colors.neutral[200]}]
      focus:border-[${DESIGN_TOKENS.colors.brand[400]}]
      focus:ring-4 focus:ring-[${DESIGN_TOKENS.colors.brand[400]}]/10
      rounded-xl
      px-4 py-3
      text-base
      transition-all duration-200
      placeholder:text-[${DESIGN_TOKENS.colors.neutral[400]}]
    `,
  },
  
  // Card variants
  card: {
    default: `
      bg-white
      border border-[${DESIGN_TOKENS.colors.neutral[200]}]
      rounded-2xl
      shadow-sm
      p-6
      transition-all duration-200
      hover:shadow-md
    `,
    interactive: `
      bg-white
      border-2 border-[${DESIGN_TOKENS.colors.neutral[200]}]
      rounded-2xl
      shadow-sm
      p-6
      transition-all duration-200
      hover:shadow-lg
      hover:border-[${DESIGN_TOKENS.colors.brand[400]}]
      cursor-pointer
    `,
  },
} as const;
