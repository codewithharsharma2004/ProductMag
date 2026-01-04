import { useState, useEffect, useMemo } from 'react'
import './App.css'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import ProductGrid from './components/ProductGrid'
import SearchBar from './components/SearchBar'
import Pagination from './components/Pagination'

const STORAGE_KEY = 'productMag_products'

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 50, description: 'High-performance laptop for work and gaming' },
  { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics', stock: 100, description: 'Latest smartphone with advanced features' },
  { id: 3, name: 'Headphones', price: 199.99, category: 'Electronics', stock: 75, description: 'Wireless noise-cancelling headphones' },
  { id: 4, name: 'Desk Chair', price: 299.99, category: 'Furniture', stock: 30, description: 'Ergonomic office chair' },
  { id: 5, name: 'Coffee Maker', price: 149.99, category: 'Appliances', stock: 45, description: 'Programmable coffee maker' },
  { id: 6, name: 'Monitor', price: 449.99, category: 'Electronics', stock: 60, description: '27-inch 4K monitor' },
  { id: 7, name: 'Keyboard', price: 89.99, category: 'Electronics', stock: 120, description: 'Mechanical gaming keyboard' },
  { id: 8, name: 'Mouse', price: 49.99, category: 'Electronics', stock: 150, description: 'Wireless ergonomic mouse' },
  { id: 9, name: 'Bookshelf', price: 179.99, category: 'Furniture', stock: 25, description: '5-tier wooden bookshelf' },
  { id: 10, name: 'Table Lamp', price: 39.99, category: 'Furniture', stock: 80, description: 'LED table lamp with dimmer' },
]

// Load products from localStorage or return default products
const loadProducts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading products from localStorage:', error)
  }
  return DEFAULT_PRODUCTS
}

function App() {
  const [products, setProducts] = useState(loadProducts)
  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const itemsPerPage = 6

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products
    }
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])

  // Paginate filtered products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  // Save products to localStorage whenever products change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    } catch (error) {
      console.error('Error saving products to localStorage:', error)
    }
  }, [products])

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleAddProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(), // Simple ID generation
    }
    setProducts([...products, newProduct])
    setShowForm(false)
  }

  const handleUpdateProduct = (productData) => {
    setProducts(products.map(p => 
      p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
    ))
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Product Management</h1>
      </header>

      <div className="app-container">
        <div className="controls-bar">
          <div className="controls-left">
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setEditingProduct(null)
                setShowForm(true)
              }}
            >
              + Add Product
            </button>
            <SearchBar onSearch={setSearchTerm} />
          </div>
          <div className="view-toggle">
            <button
              className={`btn-toggle ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 4h16v2H2V4zm0 5h16v2H2V9zm0 5h16v2H2v-2z"/>
              </svg>
            </button>
            <button
              className={`btn-toggle ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 2h6v6H2V2zm0 8h6v6H2v-6zm8-8h6v6h-6V2zm0 8h6v6h-6v-6z"/>
              </svg>
            </button>
          </div>
        </div>

        {showForm && (
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            onCancel={handleCancel}
          />
        )}

        {!showForm && (
          <>
            <div className="products-section">
              {viewMode === 'list' ? (
                <ProductList
                  products={paginatedProducts}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ) : (
                <ProductGrid
                  products={paginatedProducts}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>

            {filteredProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {filteredProducts.length === 0 && (
              <div className="empty-state">
                <p>No products found.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
