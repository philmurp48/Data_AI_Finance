# Finance360 - Customization Guide

This guide will help you customize Finance360 for your specific client needs.

## Quick Start

1. **Development Server**
   ```bash
   npm run dev
   ```
   The app will run on http://localhost:3001

2. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Customization Areas

### 1. Theme & Colors

Edit `lib/theme-config.ts` to customize your brand colors:

```typescript
// Example: Change primary color to match client brand
colors: {
  primary: {
    500: '#your-brand-color', // Main primary color
    // ... adjust other shades
  }
}
```

### 2. Business Modules

Finance360 includes 14 business insight modules located in `/app/business-consoles/`:

- **Market Demand Analytics** - Predictive demand modeling
- **Competitive Intelligence** - Market positioning analysis
- **Product Mix Optimization** - Portfolio performance
- **Supply Chain Performance** - Logistics and inventory
- **Financial Performance** - P&L and margin analysis
- And 9 more specialized modules

### 3. Navigation & Menu

Edit `/app/management-layout.tsx` to customize navigation items:

```typescript
const navigation = [
  {
    icon: Home,
    label: 'Your Custom Label',
    href: '/your-route',
  },
  // Add more items
];
```

### 4. Home Page Insights

Customize the personalized insights in `/app/page.tsx`:

```typescript
const personalizedInsights = [
  {
    title: 'Your Metric',
    insight: 'Your insight text',
    value: '+X%',
    icon: YourIcon,
    // ... other properties
  }
];
```

### 5. Branding

Update the platform name and branding:

1. **Platform Name**: Update "Finance360" in `management-layout.tsx`
2. **Page Title**: Update metadata in `layout.tsx`
3. **User Info**: Update user details in relevant components

### 6. Data Integration

To connect to your data sources:

1. Create API routes in `/app/api/`
2. Update components to fetch from your endpoints
3. Implement data transformation as needed

## Best Practices

1. **Keep it Simple**: Finance360 follows a minimal design philosophy
2. **Consistent Colors**: Use the theme colors defined in `theme-config.ts`
3. **Performance**: Use Next.js features like Image optimization and lazy loading
4. **Accessibility**: Maintain proper contrast ratios and ARIA labels

## Deployment

Finance360 can be deployed to:

- **Vercel** (recommended): `vercel deploy`
- **AWS/Azure**: Use Next.js standalone output
- **Docker**: Create a Dockerfile for containerization

## Support

For additional customization support, refer to the Next.js and Tailwind CSS documentation. 