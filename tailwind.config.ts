import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SOC Platform Colors - Clean Light Theme
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(222, 47%, 11%)",
        
        primary: {
          DEFAULT: "hsl(221, 83%, 53%)",
          foreground: "hsl(0, 0%, 100%)",
          50: "hsl(221, 83%, 95%)",
          100: "hsl(221, 83%, 90%)",
          500: "hsl(221, 83%, 53%)",
          600: "hsl(221, 83%, 45%)",
          700: "hsl(221, 83%, 37%)",
        },
        
        secondary: {
          DEFAULT: "hsl(210, 40%, 96%)",
          foreground: "hsl(222, 47%, 11%)",
        },
        
        success: {
          DEFAULT: "hsl(142, 71%, 45%)",
          foreground: "hsl(0, 0%, 100%)",
          light: "hsl(142, 71%, 95%)",
        },
        
        warning: {
          DEFAULT: "hsl(38, 92%, 50%)",
          foreground: "hsl(0, 0%, 100%)",
          light: "hsl(38, 92%, 95%)",
        },
        
        danger: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
          light: "hsl(0, 84%, 95%)",
        },
        
        muted: {
          DEFAULT: "hsl(210, 40%, 96%)",
          foreground: "hsl(215, 16%, 47%)",
        },
        
        accent: {
          DEFAULT: "hsl(210, 40%, 96%)",
          foreground: "hsl(222, 47%, 11%)",
        },
        
        border: "hsl(214, 32%, 91%)",
        input: "hsl(214, 32%, 91%)",
        ring: "hsl(221, 83%, 53%)",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.15s ease-out",
        "slide-up": "slideUp 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slideDown 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.15s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(6px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-6px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.98)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
