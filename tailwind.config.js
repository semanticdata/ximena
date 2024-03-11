/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
	content: ['./src/**/*.{njk,md}', './src/**/*.svg'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	darkMode: 'class',
	theme: {
		colors: {
			// 'blue': '#1fb6ff',
			// 'purple': '#7e5bef',
			// 'pink': '#ff49db',
			// 'orange': '#ff7849',
			// 'green': '#13ce66',
			// 'yellow': '#ffc82c',
			// 'gray-dark': '#273444',
			// 'gray': '#8492a6',
			// 'gray-light': '#d3dce6',
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			emerald: colors.emerald,
			indigo: colors.indigo,
			yellow: colors.yellow,
		},
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
			serif: ['Georgia', 'serif'],
		},
		extend: {
			spacing: {
				'8xl': '96rem',
				'9xl': '128rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
		},
	},
}
