import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';  // Import Supabase client


const PostPage = () => {
  const { postId } = useParams();  // Get postId from URL params
  const navigate = useNavigate();  // For navigation after actions (edit/delete)
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editing, setEditing] = useState(false);  // State to toggle edit mode
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  // Fetch post and comments data on page load
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
      setEditedTitle(postData.title);
      setEditedContent(postData.content);

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
  }, [postId]);

  // Handle comment submission
  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return; // Don't submit if comment is empty

    // Insert the new comment into the 'comments' table
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: postId,
          content: newComment,
          user_id: 'anonymous',  // Use user ID if available
        },
      ]);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      setComments([...comments, data[0]]);
      setNewComment('');  // Clear input field
    }
  };

  // Handle editing post
  const handleEditPost = async (e) => {
    e.preventDefault();
    
    // Update post in Supabase
    const { data, error } = await supabase
      .from('posts')
      .update({ title: editedTitle, content: editedContent })
      .eq('id', postId);

    if (error) {
      console.error('Error editing post:', error);
    } else {
      setPost(data[0]);  // Update local post data after edit
      setEditing(false);  // Exit editing mode
    }
  };

  // Handle deleting post
  const handleDeletePost = async () => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      navigate('/');  // Redirect to home after deletion
    }
  };

  if (!post) {
    return <div>Loading...</div>;  // Loading state if post is still being fetched
  }

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>

      {editing ? (
        <form onSubmit={handleEditPost}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            required
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <button onClick={() => setEditing(true)}>Edit Post</button>
          <button onClick={handleDeletePost}>Delete Post</button>
        </div>
      )}

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
