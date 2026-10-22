import ProductItem from '../components/ProductItem'
import products from '../data/products'
import './ProductList.css'

export default function ProductList() {
  return (
    <section className="product-list">
      <div className="product-list__header">
        <span className="product-list__eyebrow">GT Store</span>
        <h1>Todos os produtos</h1>
        <p>Encontre seus próximos favoritos para qualquer ocasião.</p>
      </div>
      <div className="product-list__grid">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
