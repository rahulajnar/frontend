// tailwind.config.cjs

const flowbitePlugin = require('flowbite/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-in': 'slideIn 0.7s ease-out',
        'slide-out': 'slideOut 0.7s ease-in',
        'pulse-border': 'pulseBorder 2s infinite ease-in-out',
        'backdrop-fade': 'backdropFade 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-100%)', opacity: 0 },
        },
        pulseBorder: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(255,255,255,0.4)' },
          '50%': { boxShadow: '0 0 12px rgba(255,255,255,0.6)' },
        },
        backdropFade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 0.4 },
        },
      },
      borderRadius: {
        bubble: '30px',
      },
    },
  },
  plugins: [flowbitePlugin],
};
