import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#0f0f23",
          900: "#1a1a3e",
          800: "#2d2d5f",
          700: "#4a4a7a",
          600: "#6b6b9d",
          500: "#8b8bb8",
        },
      },
      animation: {
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
      },
      backdropBlur: {
        xl: "20px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(6, 182, 212, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
