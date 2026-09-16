export default function Badge({ size = 'sm' }) {
  return (
    <img
      src="/logo.png"
      alt="CRÓ arts & crafts"
      className={`brand-logo size-${size}`}
    />
  )
}
