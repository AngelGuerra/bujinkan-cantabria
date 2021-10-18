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
  plugins: [require("@tailwindcss/aspect-ratio")],
};
