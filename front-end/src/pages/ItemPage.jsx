import { useParams } from 'react-router-dom';
import items from '../items-content';

export default function ArticlePage() {
  const { name } = useParams();

  const item = items.find(a => a.name === name);

  return (
    <>
    <h1>{item.title}</h1>
    {item.content.map(p => <p key={p}>{p}</p>)}
    </>
  );
}