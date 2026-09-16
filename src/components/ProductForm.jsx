import { useState } from 'react'
import { supabase } from '../supabaseClient.js'

const BLANK = { name: '', description: '', price: '', category: '', in_stock: true, image_url: '' }

export default function ProductForm({ initial, onSaved, onCancelEdit }) {
  const [form, setForm] = useState(initial || BLANK)
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const isEditing = Boolean(initial?.id)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function uploadImageIfNeeded() {
    if (!file) return form.image_url || null
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error: uploadError } = await supabase.storage.from('product-images').upload(path, file)
    if (uploadError) throw uploadError
    const { data } = supabase.storage.from('product-images').getPublicUrl(path)
    return data.publicUrl
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const image_url = await uploadImageIfNeeded()
      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: form.price === '' ? null : Number(form.price),
        category: form.category.trim() || null,
        in_stock: form.in_stock,
        image_url,
      }

      const { error: saveError } = isEditing
        ? await supabase.from('products').update(payload).eq('id', initial.id)
        : await supabase.from('products').insert(payload)

      if (saveError) throw saveError

      setForm(BLANK)
      setFile(null)
      onSaved()
    } catch (err) {
      setError(err.message || 'Algo deu errado ao salvar esta peça.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Editar peça' : 'Adicionar nova peça'}</h2>
      {error && <p className="form-error">{error}</p>}

      <div className="field">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          required
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="price">Preço (R$)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => update('price', e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="category">Categoria</label>
          <input
            id="category"
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            placeholder="ex.: macramê"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="photo">Foto</label>
        <input id="photo" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        {form.image_url && !file && <p className="form-note">A foto atual continua valendo, a menos que você escolha uma nova.</p>}
      </div>

      <div className="checkbox-row">
        <input
          id="in_stock"
          type="checkbox"
          checked={form.in_stock}
          onChange={(e) => update('in_stock', e.target.checked)}
        />
        <label htmlFor="in_stock" style={{ marginBottom: 0 }}>
          Pronta agora (desmarque se for só sob encomenda)
        </label>
      </div>

      <div className="form-actions">
        <button className="btn primary" type="submit" disabled={saving}>
          {saving ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Adicionar peça'}
        </button>
        {isEditing && (
          <button type="button" className="btn ghost" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
