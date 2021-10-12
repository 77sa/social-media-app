import React from "react";
import TextField from "@mui/material/TextField";

import { theme } from "../mui-theme";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

import "./createpost.css";

const CreatePost = ({ currentUser, content, setContent, submitPost }) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="status">
          <TextField
            className="textfield"
            id="outlined-multiline-static"
            label="Status"
            placeholder={`What's on your mind, ${currentUser.username}?`}
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <Button
        type="submit"
        variant="contained"
        className="submit"
        size="large"
        onClick={submitPost}
        disabled={!content}
      >
        Post
      </Button>
    </ThemeProvider>
  );
};

export default CreatePost;
