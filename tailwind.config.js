/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",    
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jose : ['Josefin Sans', "sans-serif"],
        press : ['Press Start 2P', "cursive"],
        vt : ['VT323'," monospace"]
       },
       animation: {
        rotate: "rotate 20s infinite",
        bouncein: "bouncein 3s infinite",
        bounceb: "bounceb 7s infinite",
      },
      keyframes: {
                rotate: {
                  "0%": {
                    transform: "rotate(360deg) ",
                  },
                 
                  "100%": {
                    transform: " rotate(0)",
                  },
                },
                bouncein: {
                  "0%": {
                    transform: "translate(0px , 5px) ",
                  },
                  "50%": {
                    transform: "translate(0px , 0px) ",
                  },
                 
                  "100%": {
                    transform: " translate(0px , 5px)",
                  },
                },
                bounceb: {
                  "0%": {
                    transform: "translate(0px , 5px) ",
                  },
                  "30%": {
                    transform: "translate(5px , 5px) ",
                  },
                  "70%": {
                    transform: "translate(5px , 0px) ",
                  },
                 
                  "100%": {
                    transform: " translate(0px , 5px)",
                  },
                },
      }
   }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
