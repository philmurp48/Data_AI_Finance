/**
 * Page Template
 * 
 * Standard Next.js page with Accenture branding and layout.
 * 
 * Usage:
 * 1. Copy to app/[page-name]/page.tsx
 * 2. Replace [PageName] with your page name (PascalCase)
 * 3. Replace [Page Title] and [Description] with your content
 * 4. Add your specific content in the Section
 * 5. Delete this comment block
 * 
 * This template includes:
 * - Brand header with logo
 * - Gradient background
 * - Responsive layout
 * - Section component
 * - Premium card examples
 */

import { BrandHeader, Section, PremiumCard } from '@/branding/ui';
import { Button } from '@/components/ui/button';

export default function [PageName]Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Header with branding */}
      <BrandHeader 
        title="[Page Title]"
        subtitle="[Brief description of this page]"
      />
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Primary Section */}
        <Section 
          title="[Section Title]"
          description="[Section description or leave empty]"
        >
          {/* Example: Grid of cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Example Card 1 */}
            <PremiumCard>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Card Title
              </h3>
              <p className="text-gray-600 mb-4">
                Card content goes here. Replace with your actual content.
              </p>
              <Button variant="outline" size="sm">
                Action
              </Button>
            </PremiumCard>

            {/* Example Card 2 */}
            <PremiumCard>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Card Title
              </h3>
              <p className="text-gray-600 mb-4">
                Card content goes here. Replace with your actual content.
              </p>
              <Button variant="outline" size="sm">
                Action
              </Button>
            </PremiumCard>

            {/* Example Card 3 */}
            <PremiumCard>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Card Title
              </h3>
              <p className="text-gray-600 mb-4">
                Card content goes here. Replace with your actual content.
              </p>
              <Button variant="outline" size="sm">
                Action
              </Button>
            </PremiumCard>

          </div>
        </Section>

        {/* Additional Section (optional) */}
        <Section 
          title="[Another Section]"
          className="mt-12"
        >
          {/* Add more content here */}
          <p className="text-gray-600">
            Additional content goes here...
          </p>
        </Section>

      </main>
    </div>
  );
}

// Optional: Metadata for SEO (Next.js 14+)
export const metadata = {
  title: '[Page Title] | Your App Name',
  description: '[Page description for SEO]',
};

// Optional: Generate static params for dynamic routes
// export async function generateStaticParams() {
//   return [{ id: '1' }, { id: '2' }];
// }

// Optional: Revalidate page (ISR)
// export const revalidate = 3600; // Revalidate every hour

