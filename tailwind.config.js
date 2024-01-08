/** @type {import('tailwindcss').Config} */
// const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{tsx,ts,js,jsx}"],
  theme: {
    extend: {
      screens: {
        "modile-s": {
          raw: "screen and (max-width:320px)",
        },
        "modile-m": {
          raw: "screen and (max-width:375px)",
        },
        "modile-l": {
          raw: "screen and (max-width:425px)",
        },
        tablet: {
          raw: "screen and (max-width:768px)",
        },
        loptop: {
          raw: "screen and (max-width:1040px)",
        },
        // ...defaultTheme.screens
      },
    },
  },
  plugins: [],
};
