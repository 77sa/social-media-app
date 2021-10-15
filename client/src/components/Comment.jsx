import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context";
import { getConfig } from "../utils/reqConfig";

import "./comment.css";

const Comments = ({ postid, comment, getPosts, setError }) => {
  const { currentUser } = useContext(UserContext);

  const likeComment = async (postid, commentid) => {
    try {
      await axios.patch(
        `/api/posts/likeComment/${postid}/${commentid}`,
        {},
        getConfig()
      );
      getPosts();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const deleteComment = async (postid, commentid) => {
    try {
      await axios.delete(
        `/api/posts/deleteComment/${postid}/${commentid}`,
        getConfig()
      );
      getPosts();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="comment" key={comment._id}>
      <h4>
        <Link to={`/profile/${comment.username}`}>{comment.username}</Link>
      </h4>
      <h5>{comment.date.slice(4, 24)}</h5>
      <hr />
      {comment.likes > 0 && (
        <>
          <span>{comment.likes}</span>
          <hr />
        </>
      )}
      <div className="like-comment">
        <button onClick={() => likeComment(postid, comment._id)}>
          {comment.likedBy.includes(currentUser.username) ? "unlike" : "like"}
        </button>
        {currentUser.username === comment.username && (
          <button onClick={() => deleteComment(postid, comment._id)}>
            Delete
          </button>
        )}
      </div>
      <p>{comment.comment}</p>
    </div>
  );
};

export default Comments;
