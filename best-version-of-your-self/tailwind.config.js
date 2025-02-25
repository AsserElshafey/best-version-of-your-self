/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['"Satoshi"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        Pacifico: ["Pacifico", 'sans-serif']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'banner-1': "url('/images/banner1.jpg')",
        'banner-2': "url('/images/banner2.jpg')",
        'banner-3': "url('/images/banner3.jpg')",
      },
      primary: {
        DEFAULT: '#5d6945', // Default shade (e.g., blue-500)
        50: '#EFF6FF',      // Lighter shades
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A',
      },
      secondary: {
        DEFAULT: '#E7F5DC', // Default shade (e.g., amber-500)
        50: '#FFFBEB',      // Lighter shades
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#FBBF24',
        500: '#F59E0B',
        600: '#D97706',
        700: '#B45309',
        800: '#92400E',
        900: '#78350F',
      },
    },
  },
  plugins: [],
};
