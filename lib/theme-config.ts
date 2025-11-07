// Theme Configuration for Management Reporting Platform
// Accenture-branded professional theme with Accenture Purple

export const themeConfig = {
    colors: {
        // Primary brand colors - Official Accenture Purple #A100FF
        primary: {
            navy: '#0f172a',      // Dark slate background (from Accenture tokens)
            navyLight: '#1e293b', // Lighter slate for gradients
            purple: '#A100FF',   // Official Accenture Purple primary
            purpleDark: '#7500C0', // Darker purple for hover states
            purpleLight: '#C2A3FF', // Light purple for accents
            purpleGlow: 'rgba(161, 0, 255, 0.4)', // Purple glow effect
        },

        // Secondary colors - Accenture palette
        secondary: {
            purple: '#A100FF',    // Official Accenture Purple for charts/data
            purpleLight: '#C2A3FF', // Light purple for gradients
            blue: '#3b82f6',       // Accenture Blue
            success: '#10b981',    // Success green
            warning: '#f59e0b',    // Warning amber
            danger: '#ef4444',     // Danger red
        },

        // Neutral colors
        neutral: {
            white: '#FFFFFF',
            gray50: '#F9FAFB',
            gray100: '#F3F4F6',
            gray200: '#E5E7EB',
            gray300: '#D1D5DB',
            gray400: '#9CA3AF',
            gray500: '#6B7280',
            gray600: '#4B5563',
            gray700: '#374151',
            gray800: '#1F2937',
            gray900: '#111827',
            black: '#000000',
        },

        // Semantic colors - Accenture palette
        semantic: {
            success: '#10b981',   // Accenture Success green
            warning: '#f59e0b',   // Accenture Warning amber
            error: '#ef4444',     // Accenture Danger red
            info: '#3b82f6',      // Accenture Info blue
        },

        // Background colors
        background: {
            primary: '#FFFFFF',
            secondary: '#F9FAFB',
            dark: '#0f172a',      // Dark slate background (Accenture)
            gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            cardDark: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        },

        // Text colors
        text: {
            primary: '#111827',
            secondary: '#6B7280',
            muted: '#9CA3AF',
            inverse: '#FFFFFF',   // White text for dark backgrounds
            purple: '#A100FF',    // Official Accenture Purple
        },
    },

    // Gradient definitions - Official Accenture Purple gradients
    gradients: {
        navyBlue: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        purpleGlow: 'linear-gradient(135deg, #A100FF 0%, #7500C0 100%)',
        purpleBlue: 'linear-gradient(135deg, #A100FF 0%, #3b82f6 100%)',
        darkCard: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    },

    // Shadow and glow effects - Official Accenture Purple
    effects: {
        purpleGlow: '0 0 20px rgba(161, 0, 255, 0.5)',
        purpleGlowIntense: '0 0 40px rgba(161, 0, 255, 0.8)',
        purpleShadow: '0 0 20px rgba(161, 0, 255, 0.3)',
        cardShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        cardShadowHover: '0 10px 15px -3px rgba(161, 0, 255, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },

    typography: {
        fontFamily: {
            sans: ['Graphik', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
            mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
        },
    },

    spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
    },

    borderRadius: {
        none: '0',
        sm: '0.25rem',
        base: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px',
    },

    components: {
        button: {
            primary: {
                background: 'linear-gradient(135deg, #A100FF 0%, #7500C0 100%)',
                color: '#FFFFFF',
                hoverBackground: 'linear-gradient(135deg, #7500C0 0%, #460073 100%)',
                boxShadow: '0 4px 6px -1px rgba(161, 0, 255, 0.3), 0 2px 4px -1px rgba(161, 0, 255, 0.2)',
                hoverBoxShadow: '0 10px 15px -3px rgba(161, 0, 255, 0.4), 0 4px 6px -2px rgba(161, 0, 255, 0.3)',
            },
            secondary: {
                background: 'rgba(161, 0, 255, 0.1)',
                color: '#A100FF',
                border: '1px solid #A100FF',
                hoverBackground: 'rgba(161, 0, 255, 0.2)',
            },
        },
        card: {
            light: {
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
            },
            dark: {
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                border: '1px solid rgba(161, 0, 255, 0.2)',
                color: '#FFFFFF',
            },
        },
    },
};

// Helper function to get CSS variables from theme
export function getThemeCSSVariables() {
    return {
        '--color-primary': themeConfig.colors.primary.purple,
        '--color-secondary': themeConfig.colors.secondary.blue,
        '--color-success': themeConfig.colors.semantic.success,
        '--color-warning': themeConfig.colors.semantic.warning,
        '--color-error': themeConfig.colors.semantic.error,
        '--font-sans': themeConfig.typography.fontFamily.sans.join(', '),
        '--font-mono': themeConfig.typography.fontFamily.mono.join(', '),
    };
} 