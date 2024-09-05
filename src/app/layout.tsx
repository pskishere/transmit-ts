import { FeedUrlsProvider } from '@/components/FeedUrlsProvider'
import { AudioProvider } from '@/components/AudioProvider'

import '@/styles/tailwind.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <FeedUrlsProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </FeedUrlsProvider>
      </body>
    </html>
  )
}
