/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				// ScareScale Brand Blood Red - Main accent color
				blood: {
					50: '#fef2f2',
					100: '#fde3e3',
					200: '#fbcdcd',
					300: '#f7a9a9',
					400: '#f17676',
					500: '#e64c4c',
					600: '#d32f2f', // Primary
					700: '#b02525',
					800: '#922323',
					900: '#792323',
					950: '#420f0f',
				},

				// Dark backgrounds
				dark: {
					DEFAULT: '#0a0a0a',
					lighter: '#1a1a1a',
					card: '#2a2a2a',
					border: '#3a3a3a',
				},
			},
			fontFamily: {
				sans: ['Lato', 'sans-serif'],
			},
			screens:{
				'midmd': "880px",
				'xs': '475px',
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	]
}
