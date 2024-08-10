/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primarypurp: "#4D44B5",
        redbg: "#FF4550",
      },
      colors: {
        primarypurp: "#4D44B5",
        pfpclr: "#C1BBEB",
        orange: "#FB7D5B",
        yellow: "#FCC43E",
        red: "#FF4550",
        headcolor: "#4F4F4F",
        textgray: "#C0C0C0",
        borderColor: "#A7A7A7",
        textgray1: "#667085",
        blueTitle: "#303972",
        textgray2: "#A098AE",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        kumbhfont: ["Kumbh Sans", "sans-serif"],
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
      backgroundColor: {
        bgpurp: "#F3F4FF",
        orange: "#FB7D5B",
      },
    },
  },
  plugins: [nextui()],
};
