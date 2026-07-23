import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: "#0d0f12",
          panel: "rgba(23, 25, 29, 0.82)",
          line: "#33383f",
          ink: "#f4f6f8",
          muted: "#9aa1ab",
          blue: "#3b82f6",
          emerald: "#22c55e",
          amber: "#d97706",
          violet: "#8b5cf6"
        },
        "electric-blue": "#00d1ff",
        "neon-red": "#ff003c",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)"
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)"
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)"
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)"
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)"
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)"
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
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
