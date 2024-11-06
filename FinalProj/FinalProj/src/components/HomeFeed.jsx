// src/components/HomeFeed.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- Add useNavigate
import { supabase } from '../supabaseClient';


const HomeFeed = () => {
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState('created_at');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // <-- useNavigate hook for navigation

  useEffect(() => {
    const fetchPosts = async () => {
      let { data, error } = await supabase
        .from('posts')
        .select('*')
        .ilike('title', `%${searchQuery}%`) // Simple search filter
        .order(sortOption, { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [sortOption, searchQuery]);

  return (
    <div className="feed-container">
      <h2>Home Feed</h2>
      <div>
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <select
        onChange={(e) => setSortOption(e.target.value)}
        value={sortOption}
        className="sort-select"
      >
        <option value="created_at">Sort by Date</option>
        <option value="upvotes">Sort by Upvotes</option>
      </select>

      <div>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div className="feed-item" key={post.id}>
              <h3>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h3>
              <p>{new Date(post.created_at).toLocaleString()}</p>
              <p>{post.upvotes} Upvotes</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
