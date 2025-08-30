/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Art Deco inspired colors
        'deco-gold': '#D4AF37',
        'deco-gold-light': '#F4E4C1',
        'deco-silver': '#C0C0C0',
        'deco-bronze': '#CD7F32',
        'deco-emerald': '#50C878',
        'deco-sapphire': '#0F52BA',
        'deco-ruby': '#E0115F',
        'deco-pearl': '#F8F8FF',
        'deco-onyx': '#353839',
        'deco-jet': '#343434',
        
        // Neobrutalist colors
        'brutal-black': '#000000',
        'brutal-white': '#FFFFFF',
        'brutal-red': '#FF0000',
        'brutal-blue': '#0000FF',
        'brutal-yellow': '#FFFF00',
        'brutal-green': '#00FF00',
        'brutal-purple': '#8B00FF',
        'brutal-orange': '#FF7F00',
        'brutal-pink': '#FF1493',
        
        // Modern accent colors
        'accent-cyan': '#00FFFF',
        'accent-magenta': '#FF00FF',
        'accent-lime': '#32CD32',
        'accent-coral': '#FF6B6B',
        'accent-violet': '#7C3AED',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'Impact', 'sans-serif'],
        'deco': ['Poiret One', 'Raleway', 'sans-serif'],
        'brutal': ['Space Grotesk', 'Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'exo': ['Exo 2', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px #000000',
        'brutal-lg': '8px 8px 0px #000000',
        'brutal-xl': '12px 12px 0px #000000',
        'deco': '0 4px 6px rgba(212, 175, 55, 0.1), 0 2px 4px rgba(212, 175, 55, 0.06)',
        'deco-lg': '0 10px 15px rgba(212, 175, 55, 0.15), 0 4px 6px rgba(212, 175, 55, 0.1)',
        'neon': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor',
        'inner-deco': 'inset 0 2px 4px 0 rgba(212, 175, 55, 0.06)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'geometric-spin': 'geometric-spin 20s linear infinite',
        'deco-shine': 'deco-shine 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'geometric-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'deco-shine': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'deco-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F4E4C1 50%, #D4AF37 100%)',
        'brutal-gradient': 'linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000), linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000)',
        'geometric-pattern': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.1) 10px, rgba(212, 175, 55, 0.1) 20px)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}