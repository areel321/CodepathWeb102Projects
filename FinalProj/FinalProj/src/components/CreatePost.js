// src/components/CreatePost.js
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useHistory } from 'react-router-dom';

const CreatePost = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const history = useHistory();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          user_id: userId,
          title,
          content,
          image_url: imageUrl,
          secret_key: secretKey,
        }
      ]);

    if (error) {
      console.error('Error creating post:', error);
    } else {
      history.push(`/post/${data[0].id}`);
    }
  };

  return (
    <form onSubmit={handleCreatePost}>
      <h2>Create Post</h2>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Secret Key"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
