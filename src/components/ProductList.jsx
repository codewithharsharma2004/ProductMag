function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="product-list-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="product-name">{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td className="product-description">{product.description || '-'}</td>
              <td className="action-buttons">
                <button
                  className="btn btn-edit"
                  onClick={() => onEdit(product)}
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => onDelete(product.id)}
                  title="Delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList

