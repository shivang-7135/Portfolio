// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css,scss}'],
  theme: {
    extend: {
      colors: {
        yellow: '#efc603',
        accent: '#E77C19',
        'accent-hover': '#CC6B13',
        surface: '#FFFFFF',
        bg: '#E6E6E6',
        'bg-alt': '#DCDCDC',
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
        'text-muted': '#9A9A9A',
      },
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
        '6xl': '48px',
        '7xl': '64px',
      },
      boxShadow: {
        card: '0 4px 32px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 48px rgba(0, 0, 0, 0.12)',
        dock: '0 8px 32px rgba(0, 0, 0, 0.15)',
        glow: '0 0 40px rgba(230, 126, 34, 0.3)',
      },
      keyframes: {
        typing: {
          '0%, 100%': {width: '0%'},
          '30%, 70%': {width: '100%'},
        },
        blink: {
          '0%': { opacity: 0 },
        },
        'rotate-loader': {
          '0%': { transform: 'rotate(0deg)', strokeDashoffset: '360%' },
          '100%': { transform: 'rotate(360deg)', strokeDashoffset: '-360%' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up-delay-1': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
        'fade-up-delay-2': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
        'fade-up-delay-3': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
        'fade-up-delay-4': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards',
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-up': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 6s ease-in-out infinite',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      screens: {
        touch: {raw: 'only screen and (pointer: coarse)'},
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
