// const CommentList = ({ comments }) => {
//   if (comments.length === 0) {
//     return <p className="no-comments">No comments yet.</p>;
//   }

//   return (
//     <ul className="comment-list">
//       {comments.map((comment) => (
//         <li key={comment.id} className="comment-item">
//           <p>{comment.content}</p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default CommentList;

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return <p className="no-comments">No comments yet.</p>;
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment._id} className="comment-item">
          <p>{comment.content}</p>
          {/* <small>{new Date(comment.createdAt).toLocaleString()}</small> */}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
