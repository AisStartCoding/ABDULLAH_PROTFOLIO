import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: "#020617",
          panel: "rgba(15, 23, 42, 0.78)",
          line: "#334155",
          ink: "#f8fafc",
          muted: "#94a3b8",
          blue: "#3b82f6",
          emerald: "#22c55e",
          amber: "#d97706",
          violet: "#8b5cf6"
        }
      },
      boxShadow: {
        glow: "0 0 34px rgba(34, 197, 94, 0.18)",
        module: "0 18px 55px rgba(0, 0, 0, 0.45)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(34,197,94,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
