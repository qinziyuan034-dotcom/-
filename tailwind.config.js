/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // 莫兰迪色系
        morandi: {
          // 背景色 - 雾灰蓝
          mist: "#A8B5C4",
          mistlight: "#C2CCD7",
          mistdark: "#8A99A9",
          // 强调色 - 灰豆沙
          blush: "#C8A294",
          blushlight: "#D6B3A6",
          blushdark: "#B08A7C",
          // 文字色 - 米白
          cream: "#EDE6D9",
          creamlight: "#F5F0E6",
          // 次级强调 - 灰绿
          sage: "#8FA89A",
          sagelight: "#A3B9AD",
          sagedark: "#7A9085",
          // 中性色 - 暖灰
          taupe: "#D6CFC4",
          taupedark: "#B5AEA3",
          // 深色基底
          ink: "#3A4250",
          inklight: "#525A6A",
        },
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 16px -2px rgba(58, 66, 80, 0.12)",
        press: "inset 0 2px 4px rgba(58, 66, 80, 0.15)",
        glow: "0 0 24px rgba(200, 162, 148, 0.35)",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        pop: "pop 220ms ease-out",
        "fade-in": "fadeIn 320ms ease-out",
        "slide-in": "slideIn 320ms ease-out",
      },
    },
  },
  plugins: [],
};
