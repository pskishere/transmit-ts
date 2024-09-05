import { useFeedUrls } from '@/components/FeedUrlsProvider'

export function SomeComponent() {
  const { state, dispatch } = useFeedUrls()

  const addUrl = (url: string) => {
    dispatch({ type: 'ADD_URL', payload: url })
  }

  const removeUrl = (url: string) => {
    dispatch({ type: 'REMOVE_URL', payload: url })
  }

  return (
    <div>
      {state.urls.map(url => (
        <div key={url}>
          {url}
          <button onClick={() => removeUrl(url)}>Remove</button>
        </div>
      ))}
      <button onClick={() => addUrl('https://example.com/feed')}>Add URL</button>
    </div>
  )
}