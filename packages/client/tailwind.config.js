/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wshake: {
          '0%': { transform: 'translateX(0)', color: "#AF3737"},
          '25%': { transform: 'translateX(8px)' },
          '75%': { transform: 'translateX(-8px)' },
          '100%': { transform: 'translateX(0px)' },
        },
      }
    },
  },
  plugins: [],
};
