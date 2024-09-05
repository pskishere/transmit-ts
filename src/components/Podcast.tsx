'use client'

import { parse as parseFeed } from 'rss-to-json'
import Image from 'next/image'
import posterImage from '@/images/poster.png'
import Link from 'next/link'
import { useFeedUrls } from './FeedUrlsProvider'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

export function Podcast({ feedUrl, index }: { feedUrl: string, index: number }) {
  const { state } = useFeedUrls()
  const [feed, setFeed] = useState<any>(null)

  useEffect(() => {
    async function fetchFeed() {
      const parsedFeed = await parseFeed(feedUrl) as any
      setFeed(parsedFeed)
    }
    fetchFeed()
  }, [feedUrl])

  if (!feed) {
    return null
  }

  const { image, title } = feed


  return (
    <Link href={`/${index}`}>
      <div className="podcast-card rounded-lg border p-4 shadow-lg">
        <Image
          className="w-full rounded-t-lg"
          src={image || posterImage}
          alt={title}
          width={320}
          height={320}
          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
          priority
        />
        <div className="pt-4">
          <h2 className="text-xl font-bold text-slate-900 truncate">{title}</h2>
        </div>
      </div>
    </Link>
  )
}