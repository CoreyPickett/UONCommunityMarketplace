import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CommentsList from '../CommentsList';
import AddCommentForm from '../AddCommentForm';
import items from '../items-content';
import useUser from '../useUser';

export default function ItemPage() {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  const { isLoading, user } = useUser();

  const item = items.find(a => a.name === name);

  async function onUpvoteClicked() {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post('/api/items/' + name + '/upvote', null, { headers });
    const updatedItemData = response.data;
    setUpvotes(updatedItemData.upvotes);
  }

  async function onAddComment({ nameText, commentText }) {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post('/api/items/' + name + '/comments', {
      postedBy: nameText,
      text: commentText,
    }, { headers });
    const updatedItemData = response.data;
    setComments(updatedItemData.comments);
  }

  return (
    <>
    <h1>{item.title}</h1>
    {user && <button onClick={onUpvoteClicked}>Upvote</button>}
    <p>This item has {upvotes} upvotes</p>
    {item.content.map(p => <p key={p}>{p}</p>)}
    {user
      ? <AddCommentForm onAddComment={onAddComment} />
      : <p>Log in to add a comment</p>}
    <CommentsList comments={comments} />
    </>
  );
}

export async function loader({ params }) {
  const response = await axios.get('/api/items/' + params.name);
  const { upvotes, comments } = response.data;
  return { upvotes, comments };
}