/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        'primary-dark': '#4338CA',
        // Light mode colors
        light: {
          bg: '#F3F4F6',
          card: '#FFFFFF',
          text: '#1F2937',
          'text-secondary': '#6B7280',
        },
        // Dark mode colors
        dark: {
          bg: '#111827',
          card: '#1F2937',
          text: '#F9FAFB',
          'text-secondary': '#D1D5DB',
        }
      },
      transition: {
        'colors': 'color 0.3s ease, background-color 0.3s ease',
      }
    },
  },
  plugins: [],
} 