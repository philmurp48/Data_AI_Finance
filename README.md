# Data_AI_Finance360 - Unified Financial Intelligence Platform

Data_AI_Finance360 is a modern financial reporting and analytics platform that provides real-time insights, automated reporting, and AI-driven analysis for enterprise finance teams.

## Features

- **Executive Dashboard** - Real-time KPIs and performance metrics
- **Business Insight Consoles** - 14 specialized analytics modules
- **Report Hub** - Centralized report management and distribution
- **AI-Powered Search** - Natural language queries across all data
- **Automated Insights** - Personalized recommendations and alerts

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mikearonaccenture/ACN-Finance360.git Data_AI_Finance360
cd Data_AI_Finance360

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001) to see the application.

### Deployment

**📖 For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

#### Quick Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mikearonapi/finance360-platform)

**Or manually:**

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

**Before deploying, check [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)**

#### Other Platforms

The application can be deployed to any platform that supports Next.js:
- **Vercel** (Recommended - see [DEPLOYMENT.md](./DEPLOYMENT.md))
- Netlify
- Railway
- Render
- AWS Amplify

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions for all platforms.

## Technology Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide Icons** - Icon library

## Project Structure

```
finance360/
├── app/              # Next.js app directory
├── components/       # Reusable components
├── lib/             # Utility functions and configs
└── public/          # Static assets
```

## 📊 Features Overview

### Executive Dashboard
- Real-time KPI monitoring
- Predictive analytics and forecasting
- Automated variance analysis
- Interactive data visualizations

### Business Consoles
- **Market Demand Analytics** - Customer behavior and market trends
- **Financial Performance** - P&L analysis and profitability metrics
- **Operational Efficiency** - Process optimization insights
- **Risk Management** - Risk assessment and mitigation strategies
- **And 10 more specialized modules**

### Report Hub
- Automated report generation
- Customizable templates
- Scheduled distribution
- Version control and audit trails

### AI-Powered Features
- Natural language queries
- Automated insights generation
- Anomaly detection
- Predictive recommendations

## 🛠️ Customization

See [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) for detailed instructions on:
- Customizing colors and branding
- Adding new modules and reports
- Integrating with external data sources
- Configuring user permissions

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Application Configuration
NEXT_PUBLIC_APP_NAME=Data_AI_Finance360
NEXT_PUBLIC_APP_URL=http://localhost:3001

# API Configuration (optional)
NEXT_PUBLIC_API_URL=your-api-endpoint
DATABASE_URL=your-database-url

# Authentication (optional)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3001
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://finance360-platform.vercel.app) (if deployed)
- [Documentation](./CUSTOMIZATION_GUIDE.md)
- [Issues](https://github.com/mikearonapi/finance360-platform/issues)
- [Discussions](https://github.com/mikearonapi/finance360-platform/discussions) 