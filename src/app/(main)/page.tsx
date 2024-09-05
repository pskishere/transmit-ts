import { Waveform } from '@/components/Waveform'
import { Container } from '@/components/Container'
import { AudioPlayer } from '@/components/player/AudioPlayer'
import { PodcastList } from '@/components/PodcastList'

export default function Home() {
  return (
    <>
      <Waveform className="absolute left-0 top-0 h-20 w-full" />
      <PodcastList />
      <div className="fixed bottom-0 left-0 right-0">
        <AudioPlayer />
      </div>
    </>
  )
}
