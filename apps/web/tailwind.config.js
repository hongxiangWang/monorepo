/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'oklch(0.9816 0.0017 247.8390)',
        foreground: 'oklch(0.1351 0.0330 261.4793)',
        card: 'oklch(0.9862 0 0)',
        'card-foreground': 'oklch(0.1351 0.0330 261.4793)',
        primary: 'oklch(0.4783 0.2321 28.0901)',
        'primary-foreground': 'oklch(1.0000 0 0)',
        secondary: 'oklch(0.9402 0.0043 247.9175)',
        'secondary-foreground': 'oklch(0.4783 0.2321 28.0901)',
        accent: 'oklch(0.9402 0.0043 247.9175)',
        'accent-foreground': 'oklch(0.1351 0.0330 261.4793)',
        muted: 'oklch(0.9402 0.0043 247.9175)',
        'muted-foreground': 'oklch(0.5560 0.0234 264.3637)',
        border: 'oklch(0.8921 0.0127 264.5313)',
        input: 'oklch(0.8921 0.0127 264.5313)',
        ring: 'oklch(0.4783 0.2321 28.0901)',
      },
    },
  },
  plugins: [],
};
