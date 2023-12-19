import { Inter } from 'next/font/google'
import './globals.css'
import BottomNav from "./components/navbar.js"
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aalto Events',
  description: 'The best app to find events in Aalto',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={inter.className}
      >
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
