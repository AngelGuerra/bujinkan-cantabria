const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./_site/**/*.html", "./_site/**/*.js"],
  theme: {
    extend: {
      colors: {
        "bujinkan-red": "#bf0202",
        "bujinkan-dark": "#2d2d2d",
      },
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
          "'ヒラギノ明朝 ProN'",
          "'Hiragino Mincho ProN'",
          "'游明朝'",
          "'游明朝体'",
          "YuMincho",
          "'Yu Mincho'",
          "'ＭＳ 明朝'",
          "'MS Mincho'",
          "HiraMinProN-W3",
          "'TakaoEx明朝'",
          "TakaoExMincho",
          "'MotoyaLCedar'",
          "'Droid Sans Japanese'",
          "serif",
        ],
      },
    },
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
