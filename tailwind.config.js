/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#206247',
        'primary2': '#E6F2EC',
        'gray1': '#D9D9D9',
        "gray2": '#E6E6E6',
        'gray3': '#CECECE',
        'gray4': '#848484',
        'accent': '#333333',
        'gold': '#AA913F',
        'gold2': '#F5F2EA',
        'ash': '#697988',
        'red1': '#F44336',
        'red2': '#FFE6E4'
      },
    },
  },
  plugins: [],
}