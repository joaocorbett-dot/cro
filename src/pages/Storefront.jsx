import { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Footer from '../components/Footer.jsx'
import { supabase } from '../supabaseClient.js'

export default function Storefront() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return
        if (error) console.error(error)
        setProducts(data || [])
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <Header />
      <Hero />
      <hr className="section-divider" />
      <div className="wrap" id="shop">
        <div className="section-head">
          <h2>O que foi feito</h2>
          <span className="section-head-note">
            {products.length > 0 ? `${products.length} peça${products.length === 1 ? '' : 's'}` : ''}
          </span>
        </div>
        <ProductGrid products={products} loading={loading} />
      </div>
      <Footer />
    </>
  )
}
