'use client'

import { useEffect, useState } from 'react'
import { Container } from '@/components/Container'
import { EpisodeEntry } from '@/components/EpisodeEntry'
import { useFeedUrls } from '@/components/FeedUrlsProvider'
import { type Episode, getAllEpisodes } from '@/lib/episodes'

export function EpisodeList({ podcastIndex }: { podcastIndex: number }) {
  const { state } = useFeedUrls()
  const { urls } = state
  const [episodes, setEpisodes] = useState<Episode[]>([])

  useEffect(() => {
    async function fetchEpisodes() {
      if (urls[podcastIndex]) {
        const fetchedEpisodes = await getAllEpisodes(urls[podcastIndex])
        setEpisodes(fetchedEpisodes.episodes)
      }
    }
    fetchEpisodes()
  }, [urls, podcastIndex])

  return (
    <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-slate-900">
          Episodes
        </h1>
      </Container>
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        {episodes.map((episode, index) => (
          <EpisodeEntry
            key={`EpisodeEntry-${index}`}
            episodeIndex={index}
            episode={episode}
            podcast={podcastIndex}
          />
        ))}
      </div>
    </div>
  )
}