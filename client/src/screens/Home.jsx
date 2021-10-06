import React, { useContext, useEffect, useState } from "react";
import { PostContext, UserContext } from "../Context";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import "./home.css";

const Home = ({ history }) => {
  const { currentUser } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser.username) {
      localStorage.removeItem("token");
      history.push("/login");
    }
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  }, [history, currentUser.username]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get("/api/posts");
        console.log(data);

        if (data.length === 0) return setError("There are no posts right now");

        setPosts([...data]);
        setError("");
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    getPosts();
  }, [history]);

  const submitPost = async (e) => {
    e.preventDefault();

    // setPosts([
    //   ...posts,
    //   {
    //     id: uuidv4(),
    //     username: currentUser.username,
    //     content: content,
    //   },
    // ]);

    try {
      const { data } = axios.post;
    } catch (error) {
      setError(error.response.data.error);
    }

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
        {error && <span>{error}</span>}
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <h3>
                <Link to={`/profile/${post.username}`}>{post.username}</Link>
              </h3>
              <p>{post.content}</p>
              <span>{post.likes}</span>
              <span>{post.date.slice(0, 24)}</span>
              <button>Like</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
