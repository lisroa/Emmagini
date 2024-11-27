import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		flowbite.content(),
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				sans: ["var(--font-gilroy)"],
			},
			backgroundColor: {
				"em-gray-100": "#BABCC9",
			},
			borderRadius: {
				"4xl": "2rem",
			},
			maxHeight: {
				xl: "40rem",
			},
			colors: {
				blueEmmagini: "#1C75BC",
				red: "#BC1C1C",
				backgroundGray: "#F0F6F9",
				gris: "#D9D9D9",
			},
		},
	},
	plugins: [flowbite.plugin()],
};

export default config;
