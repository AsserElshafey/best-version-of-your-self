/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom Font Families
      fontFamily: {
        // satoshi: ['var(--font-satoshi)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        Pacifico: ['var(--font-pacifico)', 'sans-serif'],
      },
      // Custom Background Images
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'banner-1': "url('/images/banner1.jpg')",
        'banner-2': "url('/images/banner2.jpg')",
        'banner-3': "url('/images/banner3.jpg')",
      },
      // Custom Colors
      colors: {
        primary: {
          DEFAULT: '#728156', // Default primary color
          dark: '#5d6945',    // Darker shade for hover states
        },
        light: '#E7F5DC',     // Light color
        text: '#2C3E50',      // Text color
      },
    },
  },
  plugins: [],
};