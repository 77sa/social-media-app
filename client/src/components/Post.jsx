import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../utils/reqConfig";

import { TextField, Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui-theme";

import "./post.css";

const Post = ({ post, currentUser, getPosts, setError }) => {
  const [comment, setComment] = useState("");

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      getPosts();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const likePost = async (id) => {
    try {
      await axios.patch(`/api/posts/like/${id}`, {
        username: currentUser.username,
      });
      getPosts();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const commentPost = async (id) => {
    try {
      await axios.post(`/api/posts/comment/${id}`, { comment }, config);
      getPosts();
    } catch (error) {
      setError(error.response.data.message);
      setComment("");
    }
  };

  return (
    <div className="post">
      <h3>
        <Link to={`/profile/${post.username}`}>{post.username}</Link>
      </h3>
      <p>{post.content}</p>
      <span>{post.date.slice(4, 24)}</span>
      <hr />
      {post.likes > 0 && (
        <>
          <span>{post.likes}</span>
          <hr />
        </>
      )}
      <div className="like-comment">
        <button onClick={() => likePost(post._id)}>
          {post.likedBy.includes(currentUser.username) ? "unlike" : "like"}
        </button>
        {currentUser.username === post.username && (
          <button onClick={() => deletePost(post._id)}>Delete</button>
        )}
      </div>
      <hr />
      <ThemeProvider theme={theme}>
        <div className="comment">
          <TextField
            size="small"
            id="filled-basic"
            variant="filled"
            label="Comment"
            style={{ background: "white", width: "80%" }}
            InputProps={{ disableUnderline: true }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            style={{
              width: "20%",
              minHeight: "48px",
              borderRadius: "0px",
              boxShadow: "none",
            }}
            disabled={!comment}
            onClick={() => commentPost(post._id)}
          >
            Post
          </Button>
        </div>
      </ThemeProvider>
      {post.comments.length > 0 ? (
        post.comments.map((comment) => {
          return (
            <div key={comment._id}>
              <h4>
                <Link to={`/profile/${comment.username}`}>
                  {comment.username}
                </Link>
              </h4>
              <h5>{comment.date.slice(4, 24)}</h5>
              <p>{comment.comment}</p>
            </div>
          );
        })
      ) : (
        <span>no comments</span>
      )}
    </div>
  );
};

export default Post;
