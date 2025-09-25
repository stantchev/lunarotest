import { Inter, Source_Serif_Pro, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerifPro = Source_Serif_Pro({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-source-serif-pro',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Linaro News - Българска платформа за киберсигурност, SEO и AI новини',
    template: '%s | Linaro News'
  },
  description: 'Водещата българска платформа за технологични новини. Експертни анализи в областта на киберсигурността, SEO оптимизация и изкуствен интелект от сертифицирани специалисти.',
  keywords: 'киберсигурност, SEO, изкуствен интелект, AI, технологични новини, България, IT новини, хакерски атаки, Google алгоритми',
  authors: [{ name: 'Linaro News Team' }],
  creator: 'Linaro News',
  publisher: 'Linaro News',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://linaronews.bg'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: 'https://linaronews.bg',
    siteName: 'Linaro News',
    title: 'Linaro News - Българска платформа за киберсигурност, SEO и AI новини',
    description: 'Експертни анализи и актуални новини от света на киберсигурността, SEO и изкуствения интелект.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Linaro News - Технологични новини',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linaro News - Българска платформа за киберсигурност, SEO и AI новини',
    description: 'Експертни анализи и актуални новини от света на киберсигурността, SEO и изкуствения интелект.',
    images: ['/og-image.jpg'],
    creator: '@linaronews',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg" className={`${inter.variable} ${sourceSerifPro.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1E40AF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-body antialiased">
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}