import React from "react";
import TextField from "@mui/material/TextField";

import { theme } from "../mui-theme";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

import "./createpost.css";

const CreatePost = ({ currentUser, content, setContent, submitPost }) => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default CreatePost;
