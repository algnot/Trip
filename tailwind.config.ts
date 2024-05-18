import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      background: '#F3F3F3',
      black: '#282828',
      white: '#FFFFFF',
      primary: '#0F6CBD',
      primaryHover: '#0061b6',
      gray: '#D0D0D0',
    },
  },
  plugins: [],
};
export default config;
