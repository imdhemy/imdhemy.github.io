const cssnano = require("cssnano");

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-nested"),
    require("autoprefixer"),
    require("postcss-discard-comments"),
    ...(process.env.NODE_ENV == "production"
        ? [cssnano({ preset: "default" })]
        : []),
  ],
};
