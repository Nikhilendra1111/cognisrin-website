/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          canvas: '#ffffff',
          card: '#f5f5f7',
          elevated: '#ffffff',
          border: '#d2d2d7',
          hairline: 'rgba(0, 0, 0, 0.08)',
          text: '#1d1d1f',
          muted: '#86868b',
          subtle: '#6e6e73',
          blue: '#0071e3',
          'blue-hover': '#0077ed',
          link: '#0066cc',
          green: '#34c759',
          orange: '#ff9500',
          red: '#ff3b30',
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif"
        ],
        mono: [
          '"SF Mono"',
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace"
        ]
      },
    },
  },
  plugins: [],
}
