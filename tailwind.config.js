const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: ["./_site/**/*.html", "./_site/**/*.js"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        japanese: ['"Noto Serif JP"', "serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    plugin(function ({ addComponents }) {
      const email = {
        ".plain-email": {
          "&::before": {
            content: `attr(data-domain) "\u0040" attr(data-user)`,
            "unicode-bidi": "bidi-override",
            direction: "rtl",
          },
        },
      };

      addComponents(email);
    }),
  ],
};
