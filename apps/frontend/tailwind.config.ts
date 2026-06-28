import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        command: {
          bg: "#020617",
          panel: "rgba(15, 23, 42, 0.72)",
          line: "rgba(148, 163, 184, 0.18)",
          cyan: "#22d3ee",
          teal: "#14b8a6",
          green: "#22c55e",
          violet: "#8b5cf6"
        }
      },
      boxShadow: {
        glow: "0 0 32px rgba(34, 211, 238, 0.18)",
        module: "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(2,6,23,0.45)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(34,211,238,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
