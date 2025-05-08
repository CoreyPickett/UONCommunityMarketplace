//Used for lisitng items on ItemListPage
import { Link } from "react-router-dom"

export default function ItemsList({ items }) {
  return (
    <>
    {items.map(a => (
      <Link key={a.name} to={'/items/' + a.name}>
        <h3>{a.title}</h3>
        <p>{a.content[0].substring(0, 150)}</p>
      </Link>
    ))}
    </>
  )
}