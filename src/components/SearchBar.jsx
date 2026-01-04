import { useState, useEffect } from 'react'

function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchInput)
    }, 500) // 500ms debounce

    return () => clearTimeout(timer)
  }, [searchInput, onSearch])

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products by name..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar

