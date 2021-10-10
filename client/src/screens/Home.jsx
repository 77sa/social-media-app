import React, { useContext, useEffect, useState } from "react";
import { PostContext, UserContext } from "../Context";
import { Link } from "react-router-dom";
import axios from "axios";

import "./home.css";

const Home = ({ history }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const getUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const { data } = await axios.get("/api/auth/getUser", config);

      setCurrentUser({ username: data.username });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getPosts = async () => {
    try {
      const { data } = await axios.get("/api/posts");

      setPosts([...data]);
      setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }

    if (!currentUser.username) getUser();

    getPosts();
  }, [history]);

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

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      // success message
      getPosts();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="home">
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

      <div className="posts">
        <h2>Posts</h2>
        {error && <span>{error}</span>}
        {!posts ? (
          <h2>No posts</h2>
        ) : (
          posts.map((post) => {
            return (
              <div className="post-home" key={post._id}>
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
          })
        )}
      </div>
    </div>
  );
};

export default Home;
