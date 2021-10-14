import React, { useContext, useEffect, useState } from "react";
import { PostContext, UserContext } from "../Context";
import axios from "axios";

import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

import { CircularProgress } from "@mui/material";

import "./home.css";

const Home = ({ history }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

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

  return (
    <div className="center">
      <div className="home">
        {isLoading ? (
          <div className="progress">
            <CircularProgress style={{ color: "white" }} />
          </div>
        ) : (
          <div className="posts">
            <CreatePost
              currentUser={currentUser}
              getPosts={getPosts}
              setError={setError}
            />
            <h2>Posts</h2>
            {error && <span>{error}</span>}
            {posts.map((post) => {
              return (
                <Post
                  key={post._id}
                  post={post}
                  currentUser={currentUser}
                  getPosts={getPosts}
                  setError={setError}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
