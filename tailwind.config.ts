import type { Config } from "tailwindcss";

const constants = {
  red: '#F23C3D',
  green: '#008D64',
  'dark-green': '#006044',
  'light-green': '#E6F2EF',
  black: '#222222',
  'light-gray': '#E8E7E3',
  white: '#FFFFFF',
  'beige': '#A49B8F',
  'dark-beige': '#8F8A7E',
  'title-color': '#5B25CE',
  'subtitle-color': '#FF0000',
  'button-orange': '#FF7A00',
  'button-orange-hover': '#FFA500',
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "transparent": "transparent",
      ...constants,
    },
    extend: {
      fontSize: {
        xs: '0.82rem',
        sm: '0.98rem',
        base: '1.15rem',
        lg: '1.22rem',
        xl: '1.36rem',
        '1.5xl': '1.5rem',
        '2xl': '1.725rem',
        '3xl': '2.155rem',
        '4xl': '2.58rem',
        '5xl': '3.45rem',
        '6xl': '4.3rem',
        '7xl': '5.17rem',
        '8xl': '6.9rem',
        '9xl': '9.2rem'
      },
      keyframes: {
        animateOpacity: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '50%': {
            opacity: '0.3'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        animation: {
          opacity: 'animateOpacity 0.3s ease-in-out',
          scaleIn: 'scaleIn 0.3s ease-in-out'
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'background': "url('/assets/images/background.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;