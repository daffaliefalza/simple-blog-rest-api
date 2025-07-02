import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PostForm from "../components/PostForm";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        console.log(response);
        setPosts(response.data);
        setFilteredPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  const handleAddPost = async (postData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/posts",
        postData
      );
      setPosts([...posts, response.data]);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (postId) => {
    const postToDelete = posts.find((post) => post._id === postId);

    const isConfirmed = window.confirm(
      `Are you sure you want to delete the post "${postToDelete?.title}"?`
    );

    if (!isConfirmed) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/posts/${postId}`
      );

      if (response.data.success) {
        setPosts(posts.filter((post) => post._id !== postId));
        alert(response.data.message);
      } else {
        alert(response.data.message || "Failed to delete post");
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          "Failed to delete post. Please try again."
      );
    }
  };
  // const handleDelete = async (postId) => {
  //   const postToDelete = posts.find((post) => post._id === postId);

  //   const isConfirmed = window.confirm(
  //     `Are you sure you want to delete the post "${postToDelete?.title}"?`
  //   );

  //   if (!isConfirmed) return;

  //   try {
  //     await axios.delete(`http://localhost:3000/posts/${postId}`);
  //     setPosts(posts.filter((post) => post._id !== postId));
  //     alert("Post deleted successfully!");
  //   } catch (err) {
  //     setError(err.message);
  //     alert("Failed to delete post. Please try again.");
  //   }
  // };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="posts-page">
      <div className="posts-header">
        <h1>Blog Posts</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn">
          {showForm ? "Cancel" : "Add New Post"}
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="btn btn-clear">
            Clear
          </button>
        )}
      </div>

      {showForm && <PostForm onSubmit={handleAddPost} />}

      {filteredPosts.length === 0 ? (
        <div className="no-results">
          {searchTerm ? (
            <p>No posts found matching "{searchTerm}"</p>
          ) : (
            <p>No posts available. Create your first post!</p>
          )}
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <div key={post._id} className="post-card">
              {" "}
              {/* Changed post.id to post._id */}
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div className="post-actions">
                <Link to={`/posts/${post._id}`} className="btn btn-view">
                  {" "}
                  {/* Changed post.id to post._id */}
                  View Details
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
