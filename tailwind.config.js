/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#ff8a33",
          orange2: "#ff6f00",
          bg: "#fffaf6",
          card: "#fff8f2",
          dark: "#1f2937",
          gray: "#7a7a7a",
        },
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};
