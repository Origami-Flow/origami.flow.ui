/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
	"./node_modules/flowbite/**/*.js"
  ],
  theme: {
  	extend: {
  		colors: {
  			roseprimary: '#B55B49',
  			verdeprimary: '#304517',
  			rosesecundary: '#ECCAC3',
  			marromsecundary: '#624836',
  			branconeutro: '#EFEFEF',
  			pretoneutro: '#292726'
  		},
  		fontFamily: {
  			sans: ['Open Sans', 'sans serif'],
  			laisha: ['Laisha']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
	require("tailwindcss-animate"),
	require('flowbite/plugin')
],
}