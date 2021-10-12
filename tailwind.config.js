module.exports = {
  mode: "jit",
  purge: ["./_site/**/*.html", "./_site/**/*.js"],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
