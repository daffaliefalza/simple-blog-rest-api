import { useState } from "react";

const PostForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
      <button type="submit" className="btn">
        Create Post
      </button>
    </form>
  );
};

export default PostForm;
