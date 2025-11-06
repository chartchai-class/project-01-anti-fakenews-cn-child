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
        <header className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-gray-700 mb-4 py-3 px-2 rounded-b">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400 hover:from-indigo-300 hover:to-sky-300">Multi-domain Anti-Fake Information</Link>
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-sm text-white/90 hover:text-indigo-300">Home</Link>
            </nav>
          </div>
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
        <footer className="mt-6 border-t border-gray-700 pt-3 text-gray-400 text-sm">
          <span className="block text-center">© 2024 Multi-domain Anti-Fake Information System</span>
        </footer>
      </div>
    </StoreProvider>
  )
}

export default App
