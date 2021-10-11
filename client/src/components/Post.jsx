import React from "react";
import { Link } from "react-router-dom";

import "./post.css";

const Post = ({ post, currentUser, deletePost }) => {
  return (
    <div className="post" key={post._id}>
      <h3>
        <Link to={`/profile/${post.username}`}>{post.username}</Link>
      </h3>
      <p>{post.content}</p>
      <span>{post.likes}</span>
      <span>{post.date.slice(0, 24)}</span>
      {/* todo: (styles+onClicks) */}
      <button>Like</button>
      {currentUser.username === post.username && (
        <button onClick={() => deletePost(post._id)}>Delete</button>
      )}
    </div>
  );
};

export default Post;
