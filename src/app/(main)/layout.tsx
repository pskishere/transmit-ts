import { AudioProvider } from '@/components/AudioProvider'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AudioProvider>{children}</AudioProvider>
}
