/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6c7ae0",
        overlay: "rgba(25, 25, 25, 0.45)",
        scrollColor: "rgba(0,0,0,0.3)",
        bgScrollbar: "#F5F5F5",
      },
    },
  },
  screens: {
    "2xl": { max: "1535px" },
    // => @media (max-width: 1535px) { ... }

    xl: { max: "1279px" },
    // => @media (max-width: 1279px) { ... }

    lg: { max: "1023px" },
    // => @media (max-width: 1023px) { ... }

    md: { max: "767px" },
    // => @media (max-width: 767px) { ... }

    sm: { max: "639px" },
    // => @media (max-width: 639px) { ... }

    xs: { max: "479px" },
    // => @media (max-width: 479px) { ... }
  },
  plugins: [],
};
