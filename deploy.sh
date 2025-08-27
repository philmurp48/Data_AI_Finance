#!/bin/bash

# Finance360 Deployment Script
# This script helps deploy the Finance360 platform to various hosting providers

echo "🚀 Finance360 Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the Finance360 project root directory"
    exit 1
fi

# Function to deploy to Vercel
deploy_vercel() {
    echo "📦 Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Build and deploy
    echo "Building project..."
    npm run build
    
    echo "Deploying to Vercel..."
    vercel --prod
    
    echo "✅ Deployment to Vercel complete!"
}

# Function to build for other platforms
build_production() {
    echo "📦 Building for production..."
    npm run build
    echo "✅ Production build complete!"
    echo "📁 Build files are in the .next directory"
    echo "💡 You can now deploy these files to your hosting provider"
}

# Main menu
echo ""
echo "Choose deployment option:"
echo "1) Deploy to Vercel (recommended)"
echo "2) Build for production (manual deployment)"
echo "3) Exit"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        deploy_vercel
        ;;
    2)
        build_production
        ;;
    3)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid option. Please choose 1, 2, or 3."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "📖 For more deployment options, see the README.md file"
