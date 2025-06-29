module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px #0ff, 0 0 20px #0ff' },
          '50%': { boxShadow: '0 0 20px #0ff, 0 0 40px #0ff' },
        },
      },
    },
  },
  plugins: [],
};
