import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';  // Supabase client instance

const PostPage = () => {
  const { postId } = useParams();  // Get post ID from URL params
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate(); // <-- useNavigate hook for navigation
  // Fetch the post data and comments when the page loads
  useEffect(() => {
    const fetchPostData = async () => {
      // Get the post by ID
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();
      
      if (postError) {
        console.error('Error fetching post:', postError);
        return;
      }
      setPost(postData);

      // Get the comments for this post
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (commentsError) {
        console.error('Error fetching comments:', commentsError);
        return;
      }
      setComments(commentsData);
    };

    fetchPostData();
  }, [postId]);  // Re-fetch when postId changes

  // Handle comment submission
  const handleAddComment = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page

    if (!newComment.trim()) {
      return;  // Don't submit if the comment is empty
    }

    // Insert the new comment into the 'comments' table
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: postId,
          content: newComment,
          user_id: 'anonymous',  // You can replace this with a user ID if you have user authentication
        },
      ]);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      // Add the new comment to the list (optimistic UI update)
      setComments([...comments, data[0]]);
      setNewComment('');  // Clear the input field
      navigate(`/`);
    }
  };

  if (!post) {
    return <div>Loading...</div>;  // Show loading state if post data is still being fetched
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h3>Comments</h3>

      <form onSubmit={handleAddComment}>
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post Comment</button>
      </form>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostPage;
