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
        safar: {
          navy: {
            DEFAULT: "#0A2240",
            dark: "#061528",
            light: "#163864",
          },
          cyan: {
            DEFAULT: "#00A3E0",
            light: "#38BDF8",
            hover: "#0284C7",
          },
          gold: {
            DEFAULT: "#C59B27",
            light: "#E5B842",
            dark: "#9E7B1D",
          },
          sand: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["Cairo", "Readex Pro", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
