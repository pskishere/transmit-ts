'use client'

import { useFeedUrls } from '@/components/FeedUrlsProvider'
import { Podcast } from '@/components/Podcast'

export function PodcastList() {
  const { state } = useFeedUrls()
  const { urls } = state

  return (
    <div className="p-8 flex justify-center min-h-screen">
      <div className="grid grid-cols-1 gap-4 pt-10 sm:grid-cols-3 lg:grid-cols-6">
        {urls.map((feedUrl, index) => (
          <Podcast key={`podcast-${index}`} feedUrl={feedUrl} index={index} />
        ))}
      </div>
    </div>
  )
}