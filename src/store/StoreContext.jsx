import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { mockNews } from '../data/mockNews'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const votesKey = 'afn_votes'
  const [votes, setVotes] = useState(() => {
    try {
      const raw = sessionStorage.getItem(votesKey)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  // Clear stored votes/comments on hard reload (allowed by spec)
  useEffect(() => {
    const navEntries = (performance.getEntriesByType && performance.getEntriesByType('navigation')) || []
    const isReload = navEntries[0]?.type === 'reload' || (performance.navigation && performance.navigation.type === 1)
    if (isReload) {
      try {
        sessionStorage.removeItem(votesKey)
      } catch {}
      setVotes([])
    }
  }, [])

  // Persist votes in sessionStorage during session
  useEffect(() => {
    try {
      sessionStorage.setItem(votesKey, JSON.stringify(votes))
    } catch {}
  }, [votes])

  const addVote = (newsId, isFake, comment, imageUrl) => {
    const newVote = {
      id: (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      newsId,
      isFake: !!isFake,
      comment: comment || '',
      imageUrl: imageUrl || '',
      user: 'You',
      time: new Date().toISOString()
    }
    setVotes(prev => [newVote, ...prev])
  }

  const getVotesCount = (newsId) => {
    const base = mockNews.find(n => n.id === newsId)?.mockVotes || { fake: 0, notFake: 0 }
    const mine = votes.filter(v => v.newsId === newsId)
    const addFake = mine.filter(v => v.isFake).length
    const addNotFake = mine.filter(v => !v.isFake).length
    return { fake: base.fake + addFake, notFake: base.notFake + addNotFake }
  }

  const getStatusForNews = (newsId) => {
    const { fake, notFake } = getVotesCount(newsId)
    if (fake > notFake) return 'Fake'
    if (notFake > fake) return 'Not Fake'
    return 'Uncertain'
  }

  const getComments = (newsId) => {
    const base = (mockNews.find(n => n.id === newsId)?.mockComments || []).map(c => ({ ...c, from: 'Mock' }))
    const mine = votes
      .filter(v => v.newsId === newsId)
      .map(v => ({ text: v.comment, imageUrl: v.imageUrl, isFake: v.isFake, author: v.user, time: v.time, from: 'You' }))
    return [...mine, ...base]
  }

  const value = useMemo(() => ({
    news: mockNews,
    votes,
    addVote,
    getVotesCount,
    getComments,
    getStatusForNews,
  }), [votes])

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)