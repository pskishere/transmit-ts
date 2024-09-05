'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

interface FeedUrlsState {
  urls: string[]
}

type Action =
  | { type: 'ADD_URL'; payload: string }
  | { type: 'REMOVE_URL'; payload: string }
  | { type: 'SET_URLS'; payload: string[] }

export const FeedUrlsContext = createContext<{
  state: FeedUrlsState
  dispatch: React.Dispatch<Action>
} | null>(null)

function feedUrlsReducer(state: FeedUrlsState, action: Action): FeedUrlsState {
  switch (action.type) {
    case 'ADD_URL':
      return { urls: [...state.urls, action.payload] }
    case 'REMOVE_URL':
      return { urls: state.urls.filter(url => url !== action.payload) }
    case 'SET_URLS':
      return { urls: action.payload }
    default:
      return state
  }
}

export function FeedUrlsProvider({ children }: { children: React.ReactNode }) {

    let feedUrls = [
      'https://feed.xyzfm.space/l3c8em3l8hfn',
      'https://data.getpodcast.xyz/data/163/6102004.xml',
      'https://data.getpodcast.xyz/data/ximalaya/3179882.xml',
      'https://www.ximalaya.com/album/31769739.xml',
    ]

  const [state, dispatch] = useReducer(feedUrlsReducer, { urls: feedUrls })

  useEffect(() => {
    const savedUrls = localStorage.getItem('feedUrls')
    if (savedUrls) {
      dispatch({ type: 'SET_URLS', payload: JSON.parse(savedUrls) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('feedUrls', JSON.stringify(state.urls))
  }, [state.urls])

  return (
    <FeedUrlsContext.Provider value={{ state, dispatch }}>
      {children}
    </FeedUrlsContext.Provider>
  )
}

export function useFeedUrls() {
  const context = useContext(FeedUrlsContext)
  if (!context) {
    throw new Error('useFeedUrls must be used within a FeedUrlsProvider')
  }
  return context
}
