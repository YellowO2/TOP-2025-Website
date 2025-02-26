import { Gurajada } from 'next/font/google';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#efdfdf',
        'background': '#0f0606',
        'primary': '#ff2a2a',
        'secondary': '#842828',
        'accent': '#d14c4c',
        'err': '#ff6600',
        'success': '#00a310',
       },
       
      fontFamily:{
        jsMath: ['jsMath-cmr10', 'serif'],
        poppins: ["Poppins-Regular, sans-serif"],
        poppinsmed: ["Poppins-Medium, sans-serif"],
      }
    },
  },
  plugins: [],
};
