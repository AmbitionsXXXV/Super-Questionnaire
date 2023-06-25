/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        gradient: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("prettier-plugin-tailwindcss")
  ],
  // 和 AntDesign 样式冲突问题
  corePlugins: {
    preflight: false
  },
  important: true
}
