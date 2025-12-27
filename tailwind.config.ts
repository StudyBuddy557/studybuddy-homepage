import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // UNIFICATION: Both Sans and Display now use Jakarta for total consistency
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"], 
      },
      colors: {
        blue: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          600: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A8A',
        },
        slate: {
          850: '#151F32',
          900: '#0F172A',
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: theme('fontFamily.display'),
              color: theme('colors.slate.900'),
              letterSpacing: '-0.03em', // Tight tracking for that "Tech" look
              fontWeight: '700',
            },
            h1: { fontSize: '2.25rem', lineHeight: '1.2' },
            p: { color: theme('colors.slate.600'), lineHeight: '1.75' },
            'ul > li::marker': { color: theme('colors.blue.600') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;