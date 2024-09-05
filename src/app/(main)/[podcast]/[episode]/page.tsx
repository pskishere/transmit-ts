import PodcastLayout from '@/components/PodcastLayout'
import { EpisodeContent } from '@/components/EpisodeContent'

export default function Episode({
  params,
}: {
  params: { podcast: number, episode: number }
}) {

  return (
    <PodcastLayout podcast={params.podcast}>
      <EpisodeContent podcastIndex={params.podcast} episodeIndex={params.episode} />
    </PodcastLayout>
  )
}

export const revalidate = 10
