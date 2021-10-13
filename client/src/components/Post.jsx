import React from "react";
import { Link } from "react-router-dom";

import "./post.css";

const Post = ({ post, currentUser, deletePost, likePost }) => {
  return (
    <div className="post">
      <h3>
        <Link to={`/profile/${post.username}`}>{post.username}</Link>
      </h3>
      <p>{post.content}</p>
      <span>{post.date.slice(0, 24)}</span>
      <hr />
      <span>{post.likes}</span>
      <button onClick={() => likePost(post._id)}>
        {post.likedBy.includes(currentUser.username) ? "unlike" : "like"}
      </button>
      {currentUser.username === post.username && (
        <button onClick={() => deletePost(post._id)}>Delete</button>
      )}
    </div>
  );
};

export default Post;
