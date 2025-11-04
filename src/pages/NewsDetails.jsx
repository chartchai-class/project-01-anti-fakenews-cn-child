import { Link, useParams } from 'react-router-dom'
import { useStore } from '../store/StoreContext.jsx'

export default function NewsDetails() {
  const { id } = useParams()
  const { news, getVotesCount, getStatusForNews } = useStore()
  const item = news.find(n => n.id === id)

  if (!item) return <div className="page"><h2>News not found</h2><Link to="/">Back to Home</Link></div>

  const status = getStatusForNews(item.id)
  const counts = getVotesCount(item.id)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">{item.topic}</h1>
      <div className="meta flex flex-wrap gap-3 text-sm text-gray-400">
        <span className="status text-red-500">{status}</span>
        <span>Reporter: {item.reporter}</span>
        <span>Reported: {new Date(item.reportedAt).toLocaleString()}</span>
      </div>

      <p className="detail text-gray-200">{item.detail}</p>

      {item.caseDetails ? (
        <div className="border border-gray-700 rounded-lg p-3">
          <h2 className="text-lg font-semibold mb-2">Case Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-1 text-gray-200">Basic Facts</h3>
              <ul className="space-y-1 text-gray-300">
                <li><span className="text-gray-400">Status:</span> {status}</li>
                <li><span className="text-gray-400">Reporter:</span> {item.reporter}</li>
                <li><span className="text-gray-400">Reported:</span> {new Date(item.reportedAt).toLocaleString()}</li>
                <li><span className="text-gray-400">Location:</span> {item.caseDetails.location.city} · {item.caseDetails.location.venue}</li>
                {item.domain ? (
                  <li><span className="text-gray-400">Domain:</span> {item.domain}</li>
                ) : null}
                {item.caseDetails.riskLevel ? (
                  <li><span className="text-gray-400">Risk Level:</span> {item.caseDetails.riskLevel}</li>
                ) : null}
                {item.caseDetails.tags?.length ? (
                  <li><span className="text-gray-400">Tags:</span> {item.caseDetails.tags.join(', ')}</li>
                ) : null}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-gray-200">Incident Timeline</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {item.caseDetails.timeline.map((t, idx) => (
                  <li key={idx}><span className="text-gray-400">{t.time}:</span> {t.event}</li>
                ))}
              </ul>
            </div>
          </div>
          {item.caseDetails.authorityActions?.length ? (
            <div className="mt-3">
              <h3 className="font-semibold mb-1 text-gray-200">Authority Actions</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {item.caseDetails.authorityActions.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {item.caseDetails.verificationNotes?.length ? (
            <div className="mt-3">
              <h3 className="font-semibold mb-1 text-gray-200">Verification Notes</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {item.caseDetails.verificationNotes.map((v, idx) => (
                  <li key={idx}>{v}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="image-block">
        <a className="text-indigo-300" href={item.imageUrl} target="_blank" rel="noreferrer">View Image Link</a>
        <img src={item.imageUrl} alt="Event" className="detail-image" />
      </div>

      <div className="results">
        <strong>Votes:</strong> <span className="fake">Fake: {counts.fake}</span> | <span className="notfake">Not Fake: {counts.notFake}</span>
      </div>

      {item.sources && item.sources.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold mb-1">Sources</h2>
          <ul className="list-disc pl-5 space-y-1">
            {item.sources.map((s, idx) => (
              <li key={idx} className="text-gray-300">
                <span className="mr-2 uppercase text-xs text-gray-400">[{s.type}]</span>
                <a className="text-indigo-300" href={s.url} target="_blank" rel="noreferrer">{s.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="actions">
        <Link className="btn" to={`/news/${item.id}/comments`}>View Comments & Results</Link>
        <Link className="btn primary" to={`/news/${item.id}/vote`}>Vote / Comment</Link>
      </div>
    </div>
  )
}