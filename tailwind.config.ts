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
        // Living Hope Design System
        bg: {
          base: "#FDF8F3",
          validation: "#EEF4EE",
          encouragement: "#FDF0E8",
          closing: "#F9F0ED",
        },
        accent: {
          gold: "#E8A849",
          coral: "#E8956A",
          sage: "#C5D5C5",
          rose: "#E6C4B8",
        },
        text: {
          primary: "#3D3D3D",
          secondary: "#6B6B6B",
          forest: "#4A6741",
        },
        // Legacy colors for compatibility
        cream: {
          50: "#FDF8F3",
          100: "#FDF8F3",
          200: "#FDF0E8",
        },
        rose: {
          warm: "#E6C4B8",
          blush: "#F9F0ED",
          light: "#FDF0E8",
        },
        gold: {
          soft: "#E8A849",
          warm: "#E8A849",
          light: "#E8D5C4",
        },
        navy: {
          deep: "#3D3D3D",
          soft: "#6B6B6B",
        },
        forest: "#4A6741",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-crimson)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
