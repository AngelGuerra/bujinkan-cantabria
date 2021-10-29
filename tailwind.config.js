const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: ["./_site/**/*.html", "./_site/**/*.js"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Montserrat",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        japanese: [
          '"Noto Serif JP"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
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
