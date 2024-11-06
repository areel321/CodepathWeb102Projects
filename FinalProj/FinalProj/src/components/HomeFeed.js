// src/components/HomeFeed.js
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const HomeFeed = () => {
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState('created_at');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order(sortOption, { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [sortOption]);

  return (
    <div>
      <h2>Home Feed</h2>
      <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
        <option value="created_at">Sort by Date</option>
        <option value="upvotes">Sort by Upvotes</option>
      </select>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h3>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h3>
            <p>{post.created_at}</p>
            <p>{post.upvotes} Upvotes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFeed;
