'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { EpisodePlayButton } from '@/components/EpisodePlayButton'
import { FormattedDate } from '@/components/FormattedDate'
import { PauseIcon } from '@/components/PauseIcon'
import { PlayIcon } from '@/components/PlayIcon'
import { getAllEpisodes, type Episode } from '@/lib/episodes'
import { useFeedUrls } from '@/components/FeedUrlsProvider'
import { LoadingSpinner } from '@/components/LoadingSpinner' // 新增导入

export function EpisodeContent({
  podcastIndex,
  episodeIndex,
}: {
  podcastIndex: number
  episodeIndex: number
}) {
  const { state } = useFeedUrls()
  const { urls } = state
  const [episode, setEpisode] = useState<Episode | null>(null)

  useEffect(() => {
    async function fetchEpisode() {
      if (urls[podcastIndex]) {
        const allEpisodes = await getAllEpisodes(urls[podcastIndex])
        const foundEpisode = allEpisodes.episodes.find(
          (ep, index) => index.toString() === episodeIndex.toString(),
        )
        if (foundEpisode) {
          setEpisode(foundEpisode)
        } else {
          notFound()
        }
      }
    }
    fetchEpisode()
  }, [urls, podcastIndex, episodeIndex])

  if (!episode) {
    return (
      <div className="flex flex-col items-center justify-center py-16 lg:py-36">
        <LoadingSpinner />
        <p className="mt-2 text-sm font-medium text-slate-600">加载中...</p>
      </div>
    )
  }

  let date = new Date(episode.published)

  return (
    <article className="py-16 lg:py-36">
      <Container>
        <header className="flex flex-col">
          <div className="flex items-center gap-6">
            <EpisodePlayButton
              episode={episode}
              className="group relative flex h-18 w-18 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-4"
              playing={
                <PauseIcon className="h-9 w-9 fill-white group-active:fill-white/80" />
              }
              paused={
                <PlayIcon className="h-9 w-9 fill-white group-active:fill-white/80" />
              }
            />
            <div className="flex flex-col">
              <h1 className="mt-2 text-4xl font-bold text-slate-900">
                {episode.title}
              </h1>
              <FormattedDate
                date={date}
                className="order-first font-mono text-sm leading-7 text-slate-500"
              />
            </div>
          </div>
          <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700"></p>
        </header>
        <hr className="my-12 border-gray-200" />
        <div
          className="prose prose-slate mt-14 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </Container>
    </article>
  )
}