import { useState } from "react";

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        required
      />
      <button type="submit" className="btn">
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
