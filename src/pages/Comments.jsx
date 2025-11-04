import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../store/StoreContext.jsx'
import Pagination from '../components/Pagination.jsx'

export default function Comments() {
  const { id } = useParams()
  const { news, getComments, getVotesCount } = useStore()
  const item = news.find(n => n.id === id)
  const comments = useMemo(() => getComments(id), [id, getComments])
  const counts = getVotesCount(id)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  if (!item) return <div className="page"><h2>News not found</h2><Link to="/">Back to Home</Link></div>

  const total = comments.length
  const startIdx = (page - 1) * pageSize
  const pageItems = comments.slice(startIdx, startIdx + pageSize)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">Comments: {item.topic}</h1>
      <div className="results">
        <strong>Votes:</strong> <span className="fake">Fake: {counts.fake}</span> | <span className="notfake">Not Fake: {counts.notFake}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label>
          Per page:
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      {loading ? (
        <ul className="grid gap-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <li key={idx} className="border border-gray-700 rounded-lg p-3 animate-pulse">
              <div className="flex gap-2 items-center">
                <div className="h-4 w-16 bg-gray-700 rounded" />
                <div className="h-4 w-24 bg-gray-700 rounded" />
                <div className="h-4 w-36 bg-gray-800 rounded" />
              </div>
              <div className="h-3 w-11/12 bg-gray-800 rounded mt-2" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid gap-3">
          {pageItems.map((c, idx) => (
            <li key={idx} className="border border-gray-700 rounded-lg p-3">
              <div className="flex gap-2 items-center text-sm">
                <span className={`badge ${c.isFake ? 'fake' : 'notfake'}`}>{c.isFake ? 'Fake' : 'Not Fake'}</span>
                <span className="author text-gray-300">{c.author}</span>
                <span className="time text-gray-400">{new Date(c.time).toLocaleString()}</span>
              </div>
              <p className="mt-1 text-gray-300">{c.text}</p>
              {c.imageUrl ? <a className="image-link text-indigo-300" href={c.imageUrl} target="_blank" rel="noreferrer">Evidence Image</a> : null}
            </li>
          ))}
        </ul>
      )}

      <Pagination currentPage={page} totalItems={total} pageSize={pageSize} onPageChange={setPage} />

      <div className="actions">
        <Link className="btn" to={`/news/${id}`}>Back to Details</Link>
        <Link className="btn primary" to={`/news/${id}/vote`}>Vote / Comment</Link>
      </div>
    </div>
  )
}