import { Jockey_One } from "next/font/google";
import type { Config } from "tailwindcss";
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		fontFamily: {
			heading1: ["jockeyOne", "serif"],
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			scrollBehavior: ["smooth"],

			colors: {
				//Daisy Ui colors
				"primary-content": "#ffffff",
				"secondary-content": "#ffffff",
				"accent-content": "#0e0c16",
				neutral: "#d9d9d9",
				"neutral-content": "#292929",
				"base-100": "#292929",
				"base-200": "#222222",
				"base-300": "#1e1e1e",
				"base-content": "#ffffff",
				info: "#a8a29e",
				"info-content": "#0a0a09",
				success: "#30c17e",
				"success-content": "#ffffff",
				warning: "#bd0929",
				"warning-content": "#ffffff",
				error: "#bd0929",
				"error-content": "#ffffff",

				//shadCn colours
				border: "var(--border)",
				input: "#787878",
				ring: "#ff7d04",
				background: "#ffffff",
				secondaryBackground: "var(--secondary-background)",
				foreground: "var(--foreground)",
				primary: {
					DEFAULT: "#ff7d04",
					foreground: "ffffff",
				},
				secondary: {
					DEFAULT: "#292929",
					foreground: "#ffffff",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)",
				},
				muted: {
					DEFAULT: "#4b4b4b",
					foreground: "#ffffff",
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				scroll: {
					to: {
						transform: "translate(calc(-50% - 0.5rem))",
					},
				},
			},
			animation: {
				scroll:
					"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-animate"),
		addVariablesForColors,
		require("daisyui"),
	],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#ff7d04",
					secondary: "#292929",
					"primary-content": "#ffffff",
					"secondary-content": "#ffffff",
					"accent-content": "#0e0c16",
					neutral: "#d9d9d9",
					"neutral-content": "#292929",
					"base-100": "#292929",
					"base-200": "#222222",
					"base-300": "#1e1e1e",
					"base-content": "#ffffff",
					info: "#a8a29e",
					"info-content": "#0a0a09",
					success: "#30c17e",
					"success-content": "#ffffff",
					warning: "#bd0929",
					"warning-content": "#ffffff",
					error: "#bd0929",
					"error-content": "#ffffff",
				},
			},
		], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: "dark", // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: "du-", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ":root", // The element that receives theme color CSS variables
	},
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}

export default config;
