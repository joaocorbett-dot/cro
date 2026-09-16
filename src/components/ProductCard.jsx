import { whatsappBuyUrl } from '../lib/contact.js'

export default function ProductCard({ product }) {
  const price = product.price != null ? `R$ ${Number(product.price).toFixed(2)}` : null
  const buyUrl = whatsappBuyUrl(product.name)

  return (
    <div className="product-card">
      <div className="product-photo">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-photo-placeholder">{product.name}</div>
        )}
      </div>
      <div className="product-name">{product.name}</div>
      {price && <div className="product-price">{price}</div>}
      {product.description && <p className="product-desc">{product.description}</p>}
      {!product.in_stock && <p className="product-out">Feito sob encomenda — pergunte sobre o prazo</p>}
      <div className="product-actions">
        {buyUrl ? (
          <a className="btn small primary" href={buyUrl} target="_blank" rel="noreferrer">
            Comprar no WhatsApp
          </a>
        ) : (
          <span className="product-out">WhatsApp não configurado — veja o README</span>
        )}
      </div>
    </div>
  )
}
