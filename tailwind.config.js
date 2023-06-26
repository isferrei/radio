/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray:"#4d4d56",
        lightGray:"#62626c",
        black800: "#1e1e21",
        black600:"#2f2f33",
        blue:"#135ee1"
      },
    },
  },
  plugins: [],
}

