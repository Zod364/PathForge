/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        bg: "#0f1115",
        surface: "#161a21",
        surface2: "#1d2230",
        border: "#252b38",
        text: "#e6edf3",
        muted: "#9aa4b2",
        mint: {
          DEFAULT: "#4ade80",
          600: "#22c55e",
          soft: "rgba(74,222,128,0.12)"
        },
        danger: "#f87171"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(74,222,128,0.25), 0 8px 32px -12px rgba(74,222,128,0.35)"
      }
    }
  },
  plugins: []
};
