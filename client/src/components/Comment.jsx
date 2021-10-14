import React from "react";
import { Link } from "react-router-dom";

import "./comment.css";

const Comments = ({ comment }) => {
  return (
    <div className="comment" key={comment._id}>
      <h4>
        <Link to={`/profile/${comment.username}`}>{comment.username}</Link>
      </h4>
      <h5>{comment.date.slice(4, 24)}</h5>
      <hr />
      <p>{comment.comment}</p>
    </div>
  );
};

export default Comments;
