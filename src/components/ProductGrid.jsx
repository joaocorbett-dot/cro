import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return <p className="section-head-note">Carregando peças…</p>
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        Ainda não há nada cadastrado. Novas peças aparecem aqui assim que ficam prontas — volte
        em breve ou acompanhe pelo Instagram.
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
