import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../store/StoreContext.jsx'
import Pagination from '../components/Pagination.jsx'

export default function Home() {
  const location = useLocation()
  const annotate = new URLSearchParams(location.search).get('annotate') === '1'
  const { news, getStatusForNews } = useStore()
  const [filter, setFilter] = useState('all') // all | fake | nonfake | uncertain
  const [domain, setDomain] = useState('all') // all | <domain>
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  const domainOptions = useMemo(() => {
    const opts = Array.from(new Set(news.map(n => n.domain))).filter(Boolean)
    return ['all', ...opts]
  }, [news])

  const filtered = useMemo(() => {
    const items = news.map(n => ({ ...n, status: getStatusForNews(n.id) }))
    return items.filter(n => {
      if (domain !== 'all' && n.domain !== domain) return false
      if (filter === 'fake') return n.status === 'Fake'
      if (filter === 'nonfake') return n.status === 'Not Fake'
      if (filter === 'uncertain') return n.status === 'Uncertain'
      return true
    })
  }, [news, getStatusForNews, filter, domain])

  const total = filtered.length
  const startIdx = (page - 1) * pageSize
  const pageItems = filtered.slice(startIdx, startIdx + pageSize)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">News</h1>
      <div className="flex flex-wrap items-center gap-3">
        <label className={annotate ? 'annotate-box' : ''}>
          Domain:
          <select value={domain} onChange={(e) => { setDomain(e.target.value); setPage(1) }}>
            {domainOptions.map(opt => (
              <option key={opt} value={opt}>{opt === 'all' ? 'All' : opt}</option>
            ))}
          </select>
          {annotate ? <span className="annotation">① Domain 下拉 ←</span> : null}
        </label>
        <label className={annotate ? 'annotate-box' : ''}>
          Filter:
          <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1) }}>
            <option value="all">All</option>
            <option value="fake">Fake</option>
            <option value="nonfake">Not Fake</option>
            <option value="uncertain">Uncertain</option>
          </select>
          {annotate ? <span className="annotation">② Filter 下拉 ←</span> : null}
        </label>
        <label className={annotate ? 'annotate-box' : ''}>
          Per page:
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          {annotate ? <span className="annotation">③ Per page 下拉 ←</span> : null}
        </label>
      </div>

      {loading ? (
        <ul className="grid gap-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <li key={idx} className="border border-gray-700 rounded-lg p-3 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-4 w-2/3 bg-gray-700 rounded" />
                <div className="h-4 w-20 bg-gray-700 rounded" />
              </div>
              <div className="h-3 w-11/12 bg-gray-800 rounded mt-2" />
              <div className="flex gap-3 mt-2">
                <div className="h-3 w-24 bg-gray-800 rounded" />
                <div className="h-3 w-36 bg-gray-800 rounded" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid gap-3">
          {pageItems.map((n) => (
            <li key={n.id} className="border border-gray-700 rounded-lg p-3 bg-black/30 transition hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-900/20">
              <div className="flex items-center justify-between">
                <Link to={`/news/${n.id}`} className="font-semibold text-white hover:text-indigo-300">{n.topic}</Link>
                <span className={`status ${n.status === 'Fake' ? 'fake' : n.status === 'Not Fake' ? 'notfake' : 'uncertain'}`}>{n.status}</span>
              </div>
              <p className="text-gray-300 mt-2">{n.shortDetail}</p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-400 mt-1">
                <span className="badge uppercase">{n.domain}</span>
                <span>Reporter: {n.reporter}</span>
                <span>Reported: {new Date(n.reportedAt).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Pagination currentPage={page} totalItems={total} pageSize={pageSize} onPageChange={setPage} />
    </div>
  )
}
