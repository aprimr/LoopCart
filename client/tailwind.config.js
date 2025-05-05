/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        pacifico: ["Pacifico", "sans-serif"],
      },
      colors: {
        softBlueGray: "rgb(230, 233, 242)",
      },
    },
  },

  plugins: [],
};
