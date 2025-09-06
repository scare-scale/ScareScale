/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				// Primary Blood Red - The main accent color
				'blood': {
					50: '#fef2f2',
					100: '#fde3e3',
					200: '#fbcdcd',
					300: '#f7a9a9',
					400: '#f17676',
					500: '#e64c4c', // Main blood red
					600: '#d32f2f', // Darker blood red
					700: '#b02525',
					800: '#922323',
					900: '#792323',
					950: '#420f0f',
				},

				// Horror-themed color palette
				'horror': {
					'black': '#0a0a0a',
					'dark': '#1a1a1a',
					'gray': '#2a2a2a',
					'light': '#3a3a3a',
					'accent': '#d32f2f',
				},

				// Background colors
				'bg': {
					'primary': '#0a0a0a',
					'secondary': '#1a1a1a',
					'accent': '#2a2a2a',
					'card': '#1a1a1a',
					'overlay': 'rgba(0, 0, 0, 0.8)',
				},

				// Text colors
				'text': {
					'primary': '#ffffff',
					'secondary': '#e5e5e5',
					'muted': '#a3a3a3',
					'accent': '#d32f2f',
				},

				// Border colors
				'border': {
					'primary': '#2a2a2a',
					'secondary': '#3a3a3a',
					'accent': '#d32f2f',
				},

				// Status colors
				'success': '#10b981',
				'warning': '#f59e0b',
				'error': '#ef4444',
				'info': '#3b82f6',

				// Legacy colors (keeping for compatibility)
				"body2": "#E0D8CB",
				"body": "#EDE8E2",
				"primary": "#d32f2f", // Updated to blood red
				"secondary": "#b02525", // Darker blood red
				"box-bg": "#1a1a1a",
				"box-shadow": "#2a2a2a",
				"box-border": "#3a3a3a",
				"heading-1": "#ffffff",
				"heading-2": "#e5e5e5",
				"heading-3": "#a3a3a3",
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
