/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-24': 'linear-gradient(24deg, var(--tw-gradient-stops))'
      },
    },
  },
  plugins: [],
}

