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
        // BRAVÍO Official Palette
        "cloudy-valley": "#B1C7D4",
        "tsunami": "#849AAD",
        "volcanic": "#605246",
        "red-oxide": "#5E1C23",
        // Extended palette
        "cloudy-valley-light": "#C8D8E2",
        "cloudy-valley-dark": "#94AEBB",
        "volcanic-light": "#7A6858",
        "volcanic-dark": "#3E342D",
        "ink": "#1A1410",
        "cream": "#F5F0EA",
      },
      fontFamily: {
        archivo: ["ArchivoBlack", "sans-serif"],
        grotesk: ["SpaceGrotesk", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem, 10vw, 9rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(3rem, 7vw, 6.5rem)", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "0.94", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 3.5vw, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.015em" }],
        "body-lg": ["clamp(1rem, 1.5vw, 1.25rem)", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "label": ["0.75rem", { lineHeight: "1", letterSpacing: "0.15em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "section": "clamp(5rem, 10vw, 10rem)",
      },
      screens: {
        "xs": "375px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
      transitionTimingFunction: {
        "bravio": "cubic-bezier(0.76, 0, 0.24, 1)",
        "bravio-in": "cubic-bezier(0.55, 0, 1, 0.45)",
        "bravio-out": "cubic-bezier(0, 0.55, 0.45, 1)",
      },
      transitionDuration: {
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      animation: {
        "fade-in": "fadeIn 1s cubic-bezier(0.76,0,0.24,1) forwards",
        "slide-up": "slideUp 1s cubic-bezier(0.76,0,0.24,1) forwards",
        "scale-in": "scaleIn 1.2s cubic-bezier(0.76,0,0.24,1) forwards",
        "cross-spin": "crossSpin 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(1.1)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        crossSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backgroundImage: {
        "bravio-gradient": "linear-gradient(135deg, #B1C7D4 0%, #849AAD 50%, #605246 100%)",
        "dark-gradient": "linear-gradient(180deg, #1A1410 0%, #605246 100%)",
        "hero-overlay": "linear-gradient(to bottom, rgba(26,20,16,0) 0%, rgba(26,20,16,0.7) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
