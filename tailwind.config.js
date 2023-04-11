/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/components/Sidebar.jsx"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      },
    },
  },
  plugins: [],
};
