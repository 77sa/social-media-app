import React from "react";

import "./createpost.css";

const CreatePost = ({ currentUser, content, setContent, submitPost }) => {
  return (
    <>
      <h2 className="write-post">Write a post: </h2>
      <div className="status">
        <textarea
          type="text"
          required
          placeholder={`What's on your mind, ${currentUser.username}?`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" onClick={submitPost} disabled={!content}>
          Post
        </button>
      </div>
    </>
  );
};

export default CreatePost;
