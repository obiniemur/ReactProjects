/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "banner-section": "url('./src/assets/Images/banner_back.png')",
        "banner-section2": "url('./src/assets/Images/Banner/Dog2.png')",
        "About-Us": "url('./src/assets/Images/Other/pet3.jpg')",
        "footer-back": "url('./src/assets/Images/Other/Vector1.png')"

      }
    },
    fontFamily: {
      'Poppins': ['Poppins', 'sans-serif'],
      'Roboto': ['Roboto', 'sans-serif'],
      'Dancing': ['Dancing Script', 'cursive']
    }
  },
  plugins: [require("daisyui")],
}

