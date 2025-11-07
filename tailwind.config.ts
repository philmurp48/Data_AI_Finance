import type { Config } from 'tailwindcss'

const config: Config = {
      content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './branding/**/*.{js,ts,jsx,tsx,mdx}',
  ],
    theme: {
        extend: {
            colors: {
                // Official Accenture Purple - #A100FF
                primary: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#A100FF', // Official Accenture Purple
                    600: '#7500C0',
                    700: '#460073',
                    800: '#3d005f',
                    900: '#2d0047',
                    DEFAULT: '#A100FF', // Official Accenture Purple
                    lightest: '#E6DCFF',
                    light: '#C2A3FF',
                    core: '#A100FF',
                    dark: '#7500C0',
                    darkest: '#460073',
                },
                // Purple alias for backward compatibility
                purple: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#A100FF',
                    600: '#7500C0',
                    700: '#460073',
                    800: '#3d005f',
                    900: '#2d0047',
                    DEFAULT: '#A100FF',
                },
                // Semantic colors
                success: {
                    DEFAULT: '#10b981',
                    light: '#d1fae5',
                    dark: '#065f46',
                },
                warning: {
                    DEFAULT: '#f59e0b',
                    light: '#fef3c7',
                    dark: '#92400e',
                },
                danger: {
                    DEFAULT: '#ef4444',
                    light: '#fee2e2',
                    dark: '#991b1b',
                },
                info: {
                    DEFAULT: '#3b82f6',
                    light: '#dbeafe',
                    dark: '#1e40af',
                },
                // Agent colors
                agent: {
                    DEFAULT: '#A100FF',
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#A100FF',
                    600: '#7500C0',
                    700: '#460073',
                    800: '#3d005f',
                    900: '#2d0047',
                    light: '#f5f3ff',
                    border: '#c084fc',
                },
                // Secondary colors
                secondary: {
                    pink: '#FF50A0',
                    blue: '#224BFF',
                    aqua: '#05F2DB',
                },
                // Neutrals
                slate: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    850: '#1a202e',
                    900: '#0f172a',
                    925: '#0f1419',
                },
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                border: 'hsl(var(--border-color))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                sans: ['Graphik', 'Inter', 'system-ui', '-apple-system', 'Arial', 'sans-serif'],
                serif: ['GT Sectra Fine', 'Georgia', 'serif'],
                mono: ['Courier', 'JetBrains Mono', 'SF Mono', 'Monaco', 'monospace'],
                display: ['Graphik', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            spacing: {
                // 4px grid system: 4, 8, 12, 16, 24, 32, 48, 64
                // Tailwind defaults already follow this, but ensuring consistency
            },
        },
    },
    plugins: [],
}

export default config 