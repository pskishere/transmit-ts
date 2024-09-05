import { parse as parseFeed } from 'rss-to-json'

export interface Episode {
  id: number
  title: string
  published: Date
  description: string
  content: string
  audio: {
    src: string
    type: string
  }
}

export async function getAllEpisodes(url: string) {
  let feed = (await parseFeed(url)) as any
  
  let episodes: Array<Episode> = feed?.items.map(
    ({ id, title, description, content, enclosures, published }: any) => ({
      id,
      title: `${title}`,
      published: new Date(published),
      description,
      content,
      audio: enclosures.map((enclosure: any) => ({
        src: enclosure.url,
        type: enclosure.type,
      }))[0],
    }),
  )

  return {episodes, title: feed.title, description: feed.description, image: feed.image}
}
