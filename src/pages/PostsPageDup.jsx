// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import PostForm from "../components/PostForm";
// import { Pagination } from "antd";

// const PostsPageDup = () => {
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [total, setTotal] = useState(0);

//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://localhost:3005/posts?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(
//           searchTerm
//         )}`
//       );
//       const data = await response.json();
//       setPosts(data.data);
//       setTotal(data.total);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [page, pageSize, searchTerm]);

//   // useEffect(() => {
//   //   const fetchPosts = async () => {
//   //     try {
//   //       const response = await axios.get("http://localhost:3005/posts");
//   //       console.log(response);
//   //       setPosts(response.data);
//   //       setFilteredPosts(response.data);
//   //       setLoading(false);
//   //     } catch (err) {
//   //       setError(err.message);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchPosts();
//   // }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredPosts(posts);
//     } else {
//       const filtered = posts.filter((post) =>
//         post.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredPosts(filtered);
//     }
//   }, [searchTerm, posts]);

//   const handleAddPost = async (postData) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3005/posts",
//         postData
//       );
//       setPosts([...posts, response.data]);
//       setShowForm(false);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDelete = async (postId) => {
//     const postToDelete = posts.find((post) => post._id === postId);

//     const isConfirmed = window.confirm(
//       `Are you sure you want to delete the post "${postToDelete?.title}"?`
//     );

//     if (!isConfirmed) return;

//     try {
//       const response = await axios.delete(
//         `http://localhost:3005/posts/${postId}`
//       );

//       if (response.data.success) {
//         setPosts(posts.filter((post) => post._id !== postId));
//         alert(response.data.message);
//       } else {
//         alert(response.data.message || "Failed to delete post");
//       }
//     } catch (err) {
//       console.error("Delete error:", err.response?.data || err.message);
//       alert(
//         err.response?.data?.message ||
//           "Failed to delete post. Please try again."
//       );
//     }
//   };
//   // const handleDelete = async (postId) => {
//   //   const postToDelete = posts.find((post) => post._id === postId);

//   //   const isConfirmed = window.confirm(
//   //     `Are you sure you want to delete the post "${postToDelete?.title}"?`
//   //   );

//   //   if (!isConfirmed) return;

//   //   try {
//   //     await axios.delete(`http://localhost:3000/posts/${postId}`);
//   //     setPosts(posts.filter((post) => post._id !== postId));
//   //     alert("Post deleted successfully!");
//   //   } catch (err) {
//   //     setError(err.message);
//   //     alert("Failed to delete post. Please try again.");
//   //   }
//   // };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">Error: {error}</div>;

//   return (
//     <div className="posts-page">
//       <div className="posts-header">
//         <h1>Blog Posts</h1>
//         <button onClick={() => setShowForm(!showForm)} className="btn">
//           {showForm ? "Cancel" : "Add New Post"}
//         </button>
//       </div>

//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search posts by title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//         {searchTerm && (
//           <button onClick={() => setSearchTerm("")} className="btn btn-clear">
//             Clear
//           </button>
//         )}
//       </div>

//       {showForm && <PostForm onSubmit={handleAddPost} />}

//       {filteredPosts.length === 0 ? (
//         <div className="no-results">
//           {searchTerm ? (
//             <p>No posts found matching "{searchTerm}"</p>
//           ) : (
//             <p>No posts available. Create your first post!</p>
//           )}
//         </div>
//       ) : (
//         <div className="posts-grid">
//           {filteredPosts.map((post) => (
//             <div key={post._id} className="post-card">
//               {" "}
//               {/* Changed post.id to post._id */}
//               <h2>{post.title}</h2>
//               <p>{post.content}</p>
//               <div className="post-actions">
//                 <Link to={`/posts/${post._id}`} className="btn btn-view">
//                   {" "}
//                   {/* Changed post.id to post._id */}
//                   View Details
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(post._id)}
//                   className="btn btn-delete"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <Pagination
//         className="pagination"
//         current={page}
//         pageSize={pageSize}
//         total={total}
//         showSizeChanger
//         onChange={(newPage, newSize) => {
//           setPage(newPage);
//           setPageSize(newSize);
//         }}
//       />
//     </div>
//   );
// };

// export default PostsPageDup;

// complex example
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import PostForm from "../components/PostForm";
// import { Pagination } from "antd";

// const PostsPageDup = () => {
//   // Read initial values from URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const initialPage = Number(urlParams.get("page")) || 1;
//   const initialPageSize = Number(urlParams.get("pageSize")) || 10;
//   const initialKeyword = urlParams.get("keyword") || "";

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState(initialKeyword);
//   const [page, setPage] = useState(initialPage);
//   const [pageSize, setPageSize] = useState(initialPageSize);
//   const [total, setTotal] = useState(0);

//   const updateURL = () => {
//     const params = new URLSearchParams();
//     params.set("page", page);
//     params.set("pageSize", pageSize);
//     if (searchTerm) params.set("keyword", searchTerm);
//     window.history.replaceState(
//       {},
//       "",
//       `${window.location.pathname}?${params.toString()}`
//     );
//   };

//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       updateURL();

//       const params = new URLSearchParams();
//       params.set("page", page);
//       params.set("pageSize", pageSize);
//       if (searchTerm) params.set("keyword", searchTerm);

//       const response = await axios.get(
//         `http://localhost:3005/posts?${params.toString()}`
//       );

//       if (response.data && Array.isArray(response.data.data)) {
//         setPosts(response.data.data);
//         setTotal(response.data.total || 0);
//       } else {
//         throw new Error("Invalid data structure from API");
//       }
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setError(error.message);
//       setPosts([]);
//       setTotal(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Reset to page 1 when search term changes
//     if (searchTerm && searchTerm !== initialKeyword) {
//       setPage(1);
//     }
//   }, [searchTerm]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchPosts();
//     }, 300); // Debounce

//     return () => clearTimeout(timer);
//   }, [page, pageSize, searchTerm]);

//   const handleAddPost = async (postData) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3005/posts",
//         postData
//       );
//       fetchPosts(); // Refresh the list
//       setShowForm(false);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDelete = async (postId) => {
//     const postToDelete = posts.find((post) => post._id === postId);

//     const isConfirmed = window.confirm(
//       `Are you sure you want to delete the post "${postToDelete?.title}"?`
//     );

//     if (!isConfirmed) return;

//     try {
//       const response = await axios.delete(
//         `http://localhost:3005/posts/${postId}`
//       );
//       fetchPosts(); // Refresh the list
//       alert(response.data.message || "Post deleted successfully");
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert(
//         err.response?.data?.message ||
//           "Failed to delete post. Please try again."
//       );
//     }
//   };

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">Error: {error}</div>;

//   return (
//     <div className="posts-page">
//       <div className="posts-header">
//         <h1>Blog Posts</h1>
//         <button onClick={() => setShowForm(!showForm)} className="btn">
//           {showForm ? "Cancel" : "Add New Post"}
//         </button>
//       </div>

//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search posts by title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//         {searchTerm && (
//           <button onClick={() => setSearchTerm("")} className="btn btn-clear">
//             Clear
//           </button>
//         )}
//       </div>

//       {showForm && <PostForm onSubmit={handleAddPost} />}

//       {!loading && posts.length === 0 ? (
//         <div className="no-results">
//           {searchTerm ? (
//             <p>No posts found matching "{searchTerm}"</p>
//           ) : (
//             <p>No posts available. Create your first post!</p>
//           )}
//         </div>
//       ) : (
//         <div className="posts-grid">
//           {posts.map((post) => (
//             <div key={post._id} className="post-card">
//               <h2>{post.title}</h2>
//               <p>{post.content}</p>
//               <div className="post-actions">
//                 <Link to={`/posts/${post._id}`} className="btn btn-view">
//                   View Details
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(post._id)}
//                   className="btn btn-delete"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {total > 0 && (
//         <Pagination
//           className="pagination"
//           current={page}
//           pageSize={pageSize}
//           total={total}
//           showSizeChanger
//           onChange={(newPage, newSize) => {
//             setPage(newPage);
//             setPageSize(newSize);
//           }}
//           onShowSizeChange={(current, newSize) => {
//             setPageSize(newSize);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default PostsPageDup;

// simpler example
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import PostForm from "../components/PostForm";
import { Pagination } from "antd";

const PostsPageDup = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const searchTerm = searchParams.get("search") || "";

  const [total, setTotal] = useState(0);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3005/posts?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(
          searchTerm
        )}`
      );
      setPosts(response.data.data || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, pageSize, searchTerm]);

  const handleSearch = (term) => {
    setSearchParams({ page: 1, pageSize, search: term });
  };

  const handlePageChange = (newPage, newSize) => {
    setSearchParams({ page: newPage, pageSize: newSize, search: searchTerm });
  };

  const handleAddPost = async (postData) => {
    try {
      await axios.post("http://localhost:3005/posts", postData);
      fetchPosts();
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (postId) => {
    const postToDelete = posts.find((post) => post._id === postId);
    if (!window.confirm(`Delete "${postToDelete?.title}"?`)) return;

    try {
      await axios.delete(`http://localhost:3005/posts/${postId}`);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    }
  };

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
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={() => handleSearch("")} className="btn btn-clear">
            Clear
          </button>
        )}
      </div>

      {showForm && <PostForm onSubmit={handleAddPost} />}

      {posts.length === 0 ? (
        <div className="no-results">
          {searchTerm ? (
            <p>No posts found matching "{searchTerm}"</p>
          ) : (
            <p>No posts available. Create your first post!</p>
          )}
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div className="post-actions">
                <Link to={`/posts/${post._id}`} className="btn btn-view">
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

      {total > 0 && (
        <Pagination
          className="pagination"
          current={page}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          onChange={handlePageChange}
          onShowSizeChange={(_, size) => handlePageChange(1, size)}
        />
      )}
    </div>
  );
};

export default PostsPageDup;
