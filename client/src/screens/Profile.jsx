import React, { useContext, useEffect, useState } from "react";
import { PostContext, UserContext } from "../Context";
import axios from "axios";
import { CircularProgress } from "@mui/material";

import Post from "../components/Post";

import "./profile.css";

const Profile = ({ history, match }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const { setPosts } = useContext(PostContext);

  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Keep user on refresh:
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

  const getUserPosts = async () => {
    try {
      const { data } = await axios.get(`/api/posts/${match.params.username}`);
      setUserPosts(data);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      // success message
      getUserPosts();
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUser();
    setPosts([]);
    getUserPosts();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="profile">
      {error && <span>{error}</span>}
      {isLoading ? (
        <div className="progress">
          <CircularProgress style={{ color: "black" }} />
        </div>
      ) : (
        <div className="posts">
          <h2>
            {match.params.username === currentUser.username
              ? "Your posts"
              : `${match.params.username}s posts`}
          </h2>
          {userPosts.map((post) => {
            return (
              <Post
                post={post}
                currentUser={currentUser}
                deletePost={deletePost}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;
