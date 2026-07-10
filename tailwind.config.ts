import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#10B981',
          dark: '#059669',
          DEFAULT: '#10B981',
        },
        dark: {
          bg: '#000000',
          card: '#1A1A1A',
          text: '#FFFFFF',
          border: '#2A2A2A',
        },
        light: {
          bg: '#FFFFFF',
          card: '#F9FAFB',
          text: '#111827',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;