import React, { useContext, useEffect, useState } from "react";
import { PostContext, UserContext } from "../Context";
import axios from "axios";

import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

import { CircularProgress } from "@mui/material"; //todo

import "./home.css";

const Home = ({ history }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      localStorage.removeItem("token");
      history.push("/login");
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
    setIsLoading(true);
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }

    if (!currentUser.username) getUser();

    getPosts();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
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
      {isLoading ? (
        <div className="progress">
          <CircularProgress style={{ color: "black" }} />
        </div>
      ) : (
        <>
          <CreatePost
            currentUser={currentUser}
            content={content}
            setContent={setContent}
            submitPost={submitPost}
          />

          <div className="posts">
            <h2>Posts</h2>
            {error && <span>{error}</span>}
            {posts.map((post) => {
              return (
                <Post
                  post={post}
                  currentUser={currentUser}
                  deletePost={deletePost}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
