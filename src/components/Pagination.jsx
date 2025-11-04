import { useMemo } from 'react'

export default function Pagination({ currentPage, totalItems, pageSize, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const pageNumbers = useMemo(() => {
    const pages = []
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, currentPage + 2)
    for (let p = start; p <= end; p++) pages.push(p)
    return pages
  }, [currentPage, totalItems, pageSize])

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      {pageNumbers.map(p => (
        <button key={p} className={p === currentPage ? 'active' : ''} onClick={() => onPageChange(p)}>{p}</button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
      <span className="pagination-info">Page {currentPage} / {totalPages}</span>
    </div>
  )
}