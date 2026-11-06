import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bravio: {
          granate: "#5E1C23",
          "granate-dark": "#3D1217",
          "granate-light": "#7E2730",
          cloudy: "#B1C7D4",
          "cloudy-light": "#D8E4EC",
          "cloudy-dark": "#7F9BAE",
          volcanic: "#121212",
          "volcanic-card": "#181716",
          "volcanic-border": "#2C2825",
          bone: "#F5F3EF",
          canvas: "#EAE6DF",
          gold: "#C2A676",
        },
      },
      fontFamily: {
        display: ["var(--font-archivo-black)", "sans-serif"],
        sans: ["var(--font-space-grotesk)", "sans-serif"],
      },
      letterSpacing: {
        cinematic: "0.25em",
        wide: "0.15em",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

