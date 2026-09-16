import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import ProductForm from '../components/ProductForm.jsx'
import { supabase } from '../supabaseClient.js'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  async function loadProducts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (error) console.error(error)
    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  async function handleDelete(product) {
    if (!confirm(`Remover "${product.name}" do site?`)) return
    const { error } = await supabase.from('products').delete().eq('id', product.id)
    if (error) {
      alert(error.message)
      return
    }
    loadProducts()
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <Badge size="sm" />
          <h1>Gerenciar peças</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <Link to="/" className="btn ghost small">
            Ver site
          </Link>
          <button className="btn ghost small" onClick={handleSignOut}>
            Sair
          </button>
        </div>
      </div>

      <ProductForm
        key={editing?.id || 'new'}
        initial={editing}
        onSaved={() => {
          setEditing(null)
          loadProducts()
        }}
        onCancelEdit={() => setEditing(null)}
      />

      <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
        {loading ? 'Carregando…' : `${products.length} peça${products.length === 1 ? '' : 's'} no site`}
      </h2>

      {products.map((p) => (
        <div className="admin-list-row" key={p.id}>
          <div className="admin-thumb">
            {p.image_url && <img src={p.image_url} alt={p.name} />}
          </div>
          <div className="admin-list-info">
            <div className="name">{p.name}</div>
            <div className="meta">
              {p.price != null ? `R$ ${Number(p.price).toFixed(2)}` : 'Sem preço definido'}
              {p.category ? ` · ${p.category}` : ''}
              {!p.in_stock ? ' · sob encomenda' : ''}
            </div>
          </div>
          <div className="admin-list-actions">
            <button className="btn small" onClick={() => setEditing(p)}>
              Editar
            </button>
            <button className="btn small danger" onClick={() => handleDelete(p)}>
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
