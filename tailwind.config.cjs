/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"body2": "#E0D8CB",
				"body": "#EDE8E2",
				"primary": "#9F7641",
				"secondary": "#AD7E49",
				"box-bg": "#EDE8E2",
				"box-shadow": "#E2E8F0",
				"box-border": "#E5E7EB",
				"heading-1": "#111827",
				"heading-2": "#111827",
				"heading-3": "#111827",
			},
			screens:{
				midmd:"880px"
			}
		},
	},
	plugins: [],
}
