/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: { // https://tailwindcss.com/docs/container
      xs: '640px',
      sm: '768px',
      md: '1024px',
      lg: '1200px'
    },
    container: {
      center: true,
      padding: { // https://tailwindcss.com/docs/container#adding-horizontal-padding
        DEFAULT: '0.5rem',
        sm: '1rem',
        md: '2rem',
      }
    },
    extend: {
     
    },
  },
  plugins: [],
}

