/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background : '#222831',
        backgroundShade : "rgba(39, 49, 69, 0.42)",
        textColor : "#fff",
        textDim : "#9A9A9A",
        primary : "#F96D00",
        primaryShade : "#E57B28",
        secondary : "#393E46",
        secondaryShade : "#4B5B75",
        accent : "#F2F2F2",
        errorMsg : "#BA4848",
        successMsg : "#57C248",
      }
    },
  },
  plugins: [],
}

