// src/components/HomeFeed.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- Add useNavigate
import { supabase } from '../supabaseClient';


const HomeFeed = () => {
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState('created_at');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // <-- useNavigate hook for navigation


  const handleUpvote = async (postId, currentUpvotes) => {
    // Increment the upvotes by 1
    const newUpvotes = currentUpvotes + 1;

    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: newUpvotes })
      .eq('id', postId); // Update the upvotes for the specific post

    if (error) {
      console.error('Error updating upvotes:', error);
    } else {
      // Update the local state with the new upvotes
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, upvotes: newUpvotes } : post
      ));
    }
  };

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
              <div>
                <p>{post.upvotes} Upvotes</p>
                {/* Add Upvote Button */}
                <button onClick={() => handleUpvote(post.id, post.upvotes)}>
                  Upvote
                </button>
              </div>
              {post.image_url ? (
                <img src={post.image_url} alt={post.title} className="post-image" />
              ) : (
                <img src="" alt="Default" className="post-image" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
