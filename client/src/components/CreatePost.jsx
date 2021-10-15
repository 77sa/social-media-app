import React, { useState } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import "./createpost.css";

const CreatePost = ({ currentUser, getPosts, setError }) => {
  const [content, setContent] = useState("");

  const submitPost = async (e) => {
    e.preventDefault();

    try {
      const newPost = {
        username: currentUser.username,
        content,
      };
      await axios.post("/api/posts", newPost); //add auth headers
      getPosts();
    } catch (error) {
      setError(error.response.data.message);
    }

    setContent("");
  };

  return (
    <div className="box">
      <div className="status">
        <TextField
          className="textfield"
          id="filled-basic"
          variant="filled"
          label="Status"
          placeholder={`What's on your mind, ${currentUser.username}?`}
          style={{ background: "white" }}
          multiline
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: "10px", width: "100%" }}
          size="large"
          onClick={submitPost}
          disabled={!content}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
