// Theme Configuration for Management Reporting Platform
// Finance360-inspired professional theme with minimal colors

export const themeConfig = {
    colors: {
        // Primary brand colors
        primary: {
            navy: '#0A1628',      // Deep navy background
            navyLight: '#1E3A5F', // Lighter navy for gradients
            cyan: '#00D9FF',      // Bright cyan accent
            cyanDark: '#00B8E6',  // Darker cyan for hover states
            cyanGlow: 'rgba(0, 217, 255, 0.4)', // Cyan glow effect
        },

        // Secondary colors
        secondary: {
            purple: '#7B3FF2',    // Purple for charts/data
            purpleLight: '#9D4EDD', // Light purple for gradients
            magenta: '#E94F8A',   // Magenta for negative indicators
            orange: '#FF6B35',    // Orange for warnings
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

        // Semantic colors
        semantic: {
            success: '#00D9FF',   // Using cyan instead of green
            warning: '#FF6B35',   // Orange
            error: '#E94F8A',     // Magenta instead of red
            info: '#7B3FF2',      // Purple
        },

        // Background colors
        background: {
            primary: '#FFFFFF',
            secondary: '#F9FAFB',
            dark: '#0A1628',      // Navy background
            gradient: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)',
            cardDark: 'linear-gradient(135deg, #0A1628 0%, #1A2B44 100%)',
        },

        // Text colors
        text: {
            primary: '#111827',
            secondary: '#6B7280',
            muted: '#9CA3AF',
            inverse: '#FFFFFF',   // White text for dark backgrounds
            cyan: '#00D9FF',
        },
    },

    // Gradient definitions
    gradients: {
        navyBlue: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)',
        cyanGlow: 'linear-gradient(135deg, #00D9FF 0%, #00B8E6 100%)',
        purplePink: 'linear-gradient(135deg, #7B3FF2 0%, #E94F8A 100%)',
        darkCard: 'linear-gradient(135deg, #0A1628 0%, #1A2B44 100%)',
    },

    // Shadow and glow effects
    effects: {
        cyanGlow: '0 0 20px rgba(0, 217, 255, 0.5)',
        cyanGlowIntense: '0 0 40px rgba(0, 217, 255, 0.8)',
        purpleGlow: '0 0 20px rgba(123, 63, 242, 0.5)',
        cardShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        cardShadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },

    typography: {
        fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
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
                background: 'linear-gradient(135deg, #00D9FF 0%, #00B8E6 100%)',
                color: '#0A1628',
                hoverBackground: 'linear-gradient(135deg, #00B8E6 0%, #0099CC 100%)',
                boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                hoverBoxShadow: '0 0 30px rgba(0, 217, 255, 0.5)',
            },
            secondary: {
                background: 'rgba(123, 63, 242, 0.1)',
                color: '#7B3FF2',
                border: '1px solid #7B3FF2',
                hoverBackground: 'rgba(123, 63, 242, 0.2)',
            },
        },
        card: {
            light: {
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
            },
            dark: {
                background: 'linear-gradient(135deg, #0A1628 0%, #1A2B44 100%)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                color: '#FFFFFF',
            },
        },
    },
};

// Helper function to get CSS variables from theme
export function getThemeCSSVariables() {
    return {
        '--color-primary': themeConfig.colors.primary.cyan,
        '--color-secondary': themeConfig.colors.secondary.purple,
        '--color-success': themeConfig.colors.semantic.success,
        '--color-warning': themeConfig.colors.semantic.warning,
        '--color-error': themeConfig.colors.semantic.error,
        '--font-sans': themeConfig.typography.fontFamily.sans.join(', '),
        '--font-mono': themeConfig.typography.fontFamily.mono.join(', '),
    };
} 