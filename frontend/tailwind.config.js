/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      red: {
        600: '#dc2626',
        700: '#b91c1c',
      },
      primary: {
        dark: '#9c714b',
        light: '#f3efea',
        accent: '#a67c52',
      },
    },
    extend: {
      spacing: {
        'section': '120px',
        'section-sm': '80px',
        'content': '64px',
        'content-sm': '32px',
      },
      fontSize: {
        'h1': '48px',
        'h2': '36px',
        'h3': '28px',
        'h4': '20px',
        'body': '16px',
        'small': '14px',
        'xs': '12px',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'elevated': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '24px',
        'button': '8px',
        'image': '16px',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideInLeft: 'slideInLeft 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
