/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors:{
          primary:"#f4ad1",
          secondary: "#471a83"
      },
       fontFamily: {
        barrio: ['Barrio', 'cursive'],
      },
    },
  },
  plugins: [],
   
};