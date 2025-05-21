import lineClamp from "@tailwindcss/line-clamp";

const config = {
  content: ["./src/**/*.{ts,tsx}"], // this is important!
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
};

export default config;
