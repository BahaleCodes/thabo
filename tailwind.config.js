/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAFAF7",
        warmgrey: "#E8E6E1",
        charcoal: "#1C1C1E",
        slate: "#4A4A4A",
        amber: "#C8973E",
        "amber-light": "#D4A84B",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        serif: ['"Lora"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
