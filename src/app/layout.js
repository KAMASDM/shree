
import './globals.css';
export const metadata = {
  title: {
    default: 'Shreedhar Instruments - FDA Compliant Analytical Solutions for Pharmaceutical Industry',
    template: '%s | Shreedhar Instruments'
  },
  description: 'Leading provider of FDA compliant analytical instruments for pharmaceutical industry. 28+ years experience, 800+ customers, 10,000+ installations across India. USP 788, 21 CFR Part 11 compliant solutions.',
  keywords: 'FDA compliant instruments, pharmaceutical analytical equipment, 21 CFR Part 11, USP 788 testing, particle counters, environmental monitoring, IQ OQ PQ validation, pharmaceutical compliance, analytical instruments India',
  authors: [{ name: 'Shreedhar Instruments' }],
  creator: 'Shreedhar Instruments',
  publisher: 'Shreedhar Instruments',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: 'index, follow',
  canonical: 'https://shreedhargroup.com',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://shreedhargroup.com',
    title: 'Shreedhar Instruments - FDA Compliant Analytical Solutions',
    description: 'Leading provider of FDA compliant analytical instruments for pharmaceutical industry in India.',
    siteName: 'Shreedhar Instruments',
    images: [
      {
        url: 'https://shreedhargroup.com/wp-content/uploads/2014/12/logo02.png',
        width: 1200,
        height: 630,
        alt: 'Shreedhar Instruments - Pharmaceutical Analytical Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shreedhar Instruments - FDA Compliant Analytical Solutions',
    description: 'Leading provider of pharmaceutical analytical instruments in India',
    images: ['https://shreedhargroup.com/wp-content/uploads/2014/12/logo02.png']
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Shreedhar Instruments",
              "alternateName": "Shreedhar Group",
              "url": "https://shreedhargroup.com",
              "logo": "https://shreedhargroup.com/wp-content/uploads/2014/12/logo02.png",
              "description": "Leading provider of FDA compliant analytical instruments for pharmaceutical industry",
              "foundingDate": "1998",
              "founder": "Mr. Jayant Joshi",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "15, Shreejikrupa Society, Opp.MGVCL Circle Office, Gotri Road",
                "addressLocality": "Vadodara",
                "addressRegion": "Gujarat",
                "postalCode": "390023",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-7096033001",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi", "Gujarati"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/shreedhar-instruments",
                "https://www.facebook.com/shreedharinstruments"
              ],
              "knowsAbout": [
                "FDA Compliance",
                "21 CFR Part 11",
                "USP 788 Testing",
                "Pharmaceutical Analytical Instruments",
                "Environmental Monitoring",
                "Particle Counting"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
      </html>
    </>
  )
}