/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        mm: "375px",
        ml: "425px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "2560px",
      },
      // not sure about adding fallback for dvh like this
      height: {
        screen: ["100vh /* fallback for Opera, IE and etc. */", "100dvh"],
      },
      colors: {
        primary: "var(--primary-color)",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
