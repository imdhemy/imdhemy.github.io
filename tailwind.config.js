module.exports = {
  content: [
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_posts/*.md",
    "./*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
