import PodcastLayout from '@/components/PodcastLayout'
import { EpisodeList } from '@/components/EpisodeList'

export default function PodcastPage({
  params,
}: {
  params: { podcast: number }
}) {
  return (
    <PodcastLayout podcast={params.podcast}>
      <EpisodeList podcastIndex={params.podcast} />
    </PodcastLayout>
  )
}

export const revalidate = 10
