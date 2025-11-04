import './index.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { StoreProvider } from './store/StoreContext.jsx'
import Home from './pages/Home.jsx'
import NewsDetails from './pages/NewsDetails.jsx'
import Comments from './pages/Comments.jsx'
import Vote from './pages/Vote.jsx'

function App() {
  return (
    <StoreProvider>
      <div className="max-w-5xl mx-auto p-4">
        <header className="flex items-center justify-between border-b border-gray-700 mb-4 py-2">
          <Link to="/" className="font-bold text-indigo-400 hover:text-indigo-300">Multi-domain Anti-Fake Information</Link>
          <nav className="flex items-center">
            <Link to="/" className="mr-4 text-sm text-white hover:text-indigo-300">Home</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/news/:id/comments" element={<Comments />} />
            <Route path="/news/:id/vote" element={<Vote />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="mt-4 border-t border-gray-700 pt-2 text-gray-400 text-sm">
          <span>© 2024 Multi-domain Anti-Fake Information System</span>
        </footer>
      </div>
    </StoreProvider>
  )
}

export default App
