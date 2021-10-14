import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { TextField, Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui-theme";

import "./post.css";

const Post = ({ post, currentUser, getPosts, setError }) => {
  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      // success message
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

  return (
    <div className="post">
      <h3>
        <Link to={`/profile/${post.username}`}>{post.username}</Link>
      </h3>
      <p>{post.content}</p>
      <span>{post.date.slice(0, 24)}</span>
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
          >
            Send
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Post;
