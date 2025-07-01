import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/posts/${postId}`),
          axios.get(`http://localhost:3000/posts/${postId}/comments`),
        ]);

        setPost(postResponse.data[0]);
        setComments(commentsResponse.data);
        setFormData({
          title: postResponse.data[0].title,
          content: postResponse.data[0].content,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${postId}`,
        formData
      );
      setPost(response.data);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the post "${post.title}"?`
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      navigate("/");
    } catch (err) {
      setError(err.message);
      alert("Failed to delete post. Please try again.");
    }
  };

  const handleAddComment = async (commentContent) => {
    try {
      // Since your backend doesn't have a comment POST endpoint, we'll simulate it
      const newComment = {
        id: comments.length + 1,
        content: commentContent,
        postId: parseInt(postId),
      };
      setComments([...comments, newComment]);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!post) return <div className="not-found">Post not found</div>;

  return (
    <div className="post-detail">
      <Link to="/" className="back-link">
        ← Back to Posts
      </Link>

      {editMode ? (
        <form onSubmit={handleUpdate} className="post-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-save">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="btn btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="post-content">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <div className="post-actions">
            <button onClick={() => setEditMode(true)} className="btn btn-edit">
              Edit Post
            </button>
            <button onClick={handleDelete} className="btn btn-delete">
              Delete Post
            </button>
          </div>
        </div>
      )}

      <div className="comments-section">
        <h2>Comments</h2>
        <CommentList comments={comments} />
        <CommentForm onSubmit={handleAddComment} />
      </div>
    </div>
  );
};

export default PostDetailPage;
