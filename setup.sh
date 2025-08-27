#!/bin/bash

# Management Reporting Platform - Custom Setup Script

echo "🚀 Setting up Custom Management Reporting Platform..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the management-reporting-custom directory"
    exit 1
fi

# Create necessary directories
echo "📁 Creating directory structure..."
mkdir -p components/assets
mkdir -p components/templates
mkdir -p components/charts
mkdir -p lib/services
mkdir -p lib/auth
mkdir -p public/images

# Create a basic .env.local file
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOL
# Custom Management Reporting Platform Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_COMPANY_NAME=Your Company
NEXT_PUBLIC_ENV=development
EOL
fi

# Create a basic custom theme file
echo "🎨 Creating custom theme configuration..."
cat > lib/theme.ts << 'EOL'
export const customTheme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      50: '#faf5ff',
      500: '#a855f7',
      600: '#9333ea',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  fonts: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
};
EOL

# Check if running from site-build directory
if [ -d "../node_modules" ]; then
    echo "✅ Found existing node_modules in parent directory"
    echo "💡 To run the development server:"
    echo "   npm run dev"
else
    echo "⚠️  No node_modules found in parent directory"
    echo "💡 To install dependencies:"
    echo "   cd ../"
    echo "   npm install"
    echo "   cd management-reporting-custom"
    echo "   npm run dev"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "1. Review README.md for project overview"
echo "2. Check CUSTOMIZATION_GUIDE.md for detailed customization instructions"
echo "3. Update .env.local with your environment variables"
echo "4. Start customizing your platform!"
echo ""
echo "🎯 Quick commands:"
echo "   npm run dev          - Start development server"
echo "   npm run build        - Build for production"
echo "   npm run start        - Start production server" 