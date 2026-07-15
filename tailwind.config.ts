import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbf5f8',
          100: '#f3e8ef',
          200: '#e6cddc',
          300: '#d3a6bf',
          400: '#bb789e',
          500: '#a15682',
          600: '#8a4b6e',
          700: '#723c59',
          800: '#5f334a',
          900: '#512d40',
        },
        cream: '#fdfaf6',
        ink: '#2b2b2b',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      typography: () => ({
        brand: {
          css: {
            '--tw-prose-body': '#2b2b2b',
            '--tw-prose-headings': '#512d40',
            '--tw-prose-links': '#8a4b6e',
            '--tw-prose-bold': '#2b2b2b',
            '--tw-prose-quotes': '#5f334a',
            a: {
              fontWeight: '600',
              textDecoration: 'underline',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
