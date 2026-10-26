import type { Config } from "tailwindcss";

// Accent colours and sizes come straight from the Kyoto card spec.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: "#E8604C",
        purple: "#7B5CC4",
        amber: "#C98A12",
        placeholder: "#D9D9D9",
        cardline: "#CFCFCF",
        muted: "#6B6B6B",
      },
      maxWidth: { card: "360px" },
    },
  },
  plugins: [],
};
export default config;
