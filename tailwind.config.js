/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.tsx", "./**/*.css"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          mediappv: "#005768",
        },
        secondary: {
          mediappv: "#D6E2E3",
        },
      },
    },
  },
  plugins: [],
};
