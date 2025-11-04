import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useStore } from '../store/StoreContext.jsx'

export default function Vote() {
  const { id } = useParams()
  const { news, addVote } = useStore()
  const item = news.find(n => n.id === id)
  const navigate = useNavigate()
  const [choice, setChoice] = useState('')
  const [comment, setComment] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  if (!item) return <div className="page"><h2>News not found</h2><Link to="/">Back to Home</Link></div>

  const onSubmit = (e) => {
    e.preventDefault()
    if (!choice) return alert('Please select Fake or Not Fake')
    addVote(id, choice === 'fake', comment, imageUrl)
    navigate(`/news/${id}/comments`)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">Vote on: {item.topic}</h1>
      <form className="vote-form" onSubmit={onSubmit}>
        <fieldset className="border border-gray-700 rounded-lg p-3">
          <legend className="text-sm text-gray-300">Your Vote</legend>
          <label className="mr-4"><input type="radio" name="vote" value="fake" checked={choice === 'fake'} onChange={(e) => setChoice(e.target.value)} /> Fake</label>
          <label><input type="radio" name="vote" value="notfake" checked={choice === 'notfake'} onChange={(e) => setChoice(e.target.value)} /> Not Fake</label>
        </fieldset>

        <label className="block">
          <span className="text-sm text-gray-300">Comment (why?)</span>
          <textarea className="w-full mt-1 p-2 rounded border border-gray-700 bg-black/40" value={comment} onChange={(e) => setComment(e.target.value)} rows={4} placeholder="Explain your reasoning" />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Evidence Image URL (optional)</span>
          <input className="w-full mt-1 p-2 rounded border border-gray-700 bg-black/40" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
        </label>

        <div className="actions">
          <button type="submit" className="btn primary">Submit Vote</button>
          <Link className="btn" to={`/news/${id}`}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}