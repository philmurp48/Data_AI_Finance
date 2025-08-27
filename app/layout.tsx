import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutWrapper from './layout-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Finance360 - Management Reporting Platform',
    template: '%s | Finance360'
  },
  description: 'Enterprise financial management platform with real-time reporting, AI-powered insights, and comprehensive month-end close capabilities.',
  keywords: [
    'financial reporting',
    'management reporting',
    'business intelligence',
    'financial analytics',
    'month-end close',
    'FP&A platform',
    'financial planning',
    'business performance',
    'enterprise finance',
    'AI financial insights'
  ],
  authors: [{ name: 'Finance360 Team' }],
  creator: 'Finance360',
  publisher: 'Finance360',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://finance360.vercel.app'),
  openGraph: {
    title: 'Finance360 - Management Reporting Platform',
    description: 'Enterprise financial management platform with real-time reporting and AI-powered insights.',
    url: 'https://finance360.vercel.app',
    siteName: 'Finance360',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finance360 Management Reporting Platform'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance360 - Management Reporting Platform',
    description: 'Enterprise financial management platform with real-time reporting and AI-powered insights.',
    images: ['/twitter-image.png'],
    creator: '@finance360',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      }
    ]
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://finance360.vercel.app',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Finance360',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Web',
              description: 'Enterprise financial management platform with real-time reporting, AI-powered insights, and comprehensive month-end close capabilities.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '127'
              },
              author: {
                '@type': 'Organization',
                name: 'Finance360',
                url: 'https://finance360.vercel.app'
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
} 