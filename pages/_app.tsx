import Script from 'next/script'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { NFTProvider } from '../context/NFTContext'

import { Navbar, Footer } from '@/components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NFTProvider>
      <ThemeProvider attribute='class'>
        <div className='min-h-screen bg-white dark:bg-nft-dark'>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
        <Script
          src='https://kit.fontawesome.com/b48c113f01.js'
          crossOrigin='anonymous'
        ></Script>
      </ThemeProvider>
    </NFTProvider>
  )
}
