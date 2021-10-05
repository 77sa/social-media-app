import React, { useContext, useEffect, useState } from "react";
import { PostContext, UserContext } from "../Context";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import "./home.css";

const Home = ({ history }) => {
  const { currentUser } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    if (!currentUser.username) {
      localStorage.removeItem("token");
      history.push("/login");
    }
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  }, [history, currentUser.username]);

  const [content, setContent] = useState("");

  const submitPost = (e) => {
    e.preventDefault();

    // post request then update posts in useEffect
    setPosts([
      ...posts,
      {
        id: uuidv4(),
        username: currentUser.username,
        content: content,
      },
    ]);

    setContent("");
  };

  return (
    <div className="home">
      <h2>Write a post: </h2>
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

      <div className="posts">
        <h2>Posts:</h2>
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <h3>
                <Link to={`/profile/${post.username}`}>{post.username}</Link>
              </h3>
              <p>{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
