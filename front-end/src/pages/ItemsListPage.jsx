import ItemsList from "../ItemsList";
import items from "../items-content";

export default function ItemsListPage() {
  return (
    <>
    <h1>Items</h1>
    <ItemsList items={items} />
    </>
  );
}