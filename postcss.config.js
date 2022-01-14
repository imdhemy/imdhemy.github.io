const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-nested"),
    require("autoprefixer"),
    require("postcss-discard-comments"),
    purgecss({
      content: [
        "./_includes/**/*.html",
        "./_layouts/**/*.html",
        "./_posts/*.md",
        "./*.html",
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
    ...(process.env.NODE_ENV == "production"
        ? [cssnano({ preset: "default" })]
        : []),
  ],
};
