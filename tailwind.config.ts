import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
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
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
