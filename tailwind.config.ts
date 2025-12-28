import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px", // Prevents content from stretching too wide on massive monitors
      },
    },
    extend: {
      colors: {
        // AGENCY GRADE PALETTE
        primary: {
          DEFAULT: "#0F766E", 
          hover: "#115E59",   
          light: "#CCFBF1",   
          foreground: "#FFFFFF", // Added for text-on-primary safety
        },
        secondary: {
          DEFAULT: "#0F172A", 
          muted: "#475569",
          light: "#F1F5F9",   // Added for subtle backgrounds
        },
        gold: {
          DEFAULT: "#F59E0B", 
          glow: "#FEF3C7",    
        },
        surface: "#F8FAFC",
        error: "#EF4444",
        success: "#10B981",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      // 1. DEPTH: Softer, more expensive looking shadows
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(15, 118, 110, 0.3)', // Teal glow for primary actions
      },
      // 2. CONSISTENCY: Enforce brand curvature
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      // 3. MOTION: The "Premium Feel"
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require("tailwindcss-animate")],
};
export default config;