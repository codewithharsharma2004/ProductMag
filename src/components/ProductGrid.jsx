function ProductGrid({ products, onEdit, onDelete }) {
  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-card-header">
              <h3 className="product-card-name">{product.name}</h3>
              <span className="product-card-category">{product.category}</span>
            </div>
            <div className="product-card-body">
              <div className="product-card-price">${product.price.toFixed(2)}</div>
              <div className="product-card-stock">
                <strong>Stock:</strong> {product.stock}
              </div>
              {product.description && (
                <div className="product-card-description">
                  {product.description}
                </div>
              )}
            </div>
            <div className="product-card-actions">
              <button
                className="btn btn-edit"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductGrid

