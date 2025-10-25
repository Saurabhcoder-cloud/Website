import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e3a8a'
      }
    }
  },
  plugins: []
};

export default config;
