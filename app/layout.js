import './globals.css'

import {
  siteBasePath,
  siteKeywords,
  siteName,
  siteOverview
} from '@/lib/constants'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { ReduxProviders } from '@/lib/redux/providers'
import { Titillium_Web } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const titillium = Titillium_Web({
  weight: ['200', '300', '400', '600', '700', '900'],
  subsets: ['latin']
})

export const metadata = {
  // Meta
  title: {
    template: '%s | SVM',
    default: siteName
  },
  description: siteOverview,
  metadataBase: new URL(siteBasePath),
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: siteKeywords,
  colorScheme: 'light',
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  // Opengraph
  openGraph: {
    title: siteName,
    description: siteOverview,
    url: 'https://www.sportvalue.app',
    siteName: siteName,
    locale: 'en_US',
    type: 'article',
    publishedTime: new Date(),
    authors: [siteName]
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteOverview
  },
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  sitemap: `${siteBasePath}/sitemap.xml`
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProviders>
        <body
          className={`${titillium.className} bg-accent-dark text-[#333333]`}>
          {/* <Navbar /> */}
          <div className="bg-background">{children}</div>
          {/* <Footer /> */}
          <Toaster />
        </body>
      </ReduxProviders>
    </html>
  )
}
