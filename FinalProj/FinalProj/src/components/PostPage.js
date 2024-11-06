// src/components/PostPage.js
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
    };

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId);

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('comments')
      .insert([{ post_id: postId, user_id: 'some-user-id', content: newComment }]);

    if (error) {
      console.error('Error posting comment:', error);
    } else {
      setNewComment('');
      setComments([...comments, { content: newComment }]);
    }
  };

  const handleUpvote = async () => {
    const { error } = await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', postId);

    if (error) {
      console.error('Error upvoting post:', error);
    } else {
      setPost({ ...post, upvotes: post.upvotes + 1 });
    }
  };

  return post ? (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <img src={post.image_url} alt={post.title} />
      <p>{post.upvotes} Upvotes</p>
      <button onClick={
