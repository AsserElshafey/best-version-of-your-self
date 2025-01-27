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
    },
  },
  plugins: [],
};
