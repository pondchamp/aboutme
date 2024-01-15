module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        beige: "#FFEDDD",
        brown1: "#201202",
        brown2: "#160D02",
      },
    },
  },
  variants: {},
};
