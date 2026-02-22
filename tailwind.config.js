/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1a2b4b', // Deep Navy
                    light: '#2c3e50',
                },
                secondary: {
                    DEFAULT: '#d35400', // Copper/Orange from logo
                    light: '#e67e22',
                },
                accent: {
                    DEFAULT: '#7f8c8d', // Neutral Grey
                    light: '#95a5a6',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
