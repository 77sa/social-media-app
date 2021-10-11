import React, { useContext, useEffect, useState } from "react";
import { PostContext, UserContext } from "../Context";
import axios from "axios";

import Post from "../components/Post";

import "./profile.css";

const Profile = ({ history, match }) => {
  // will be used to check if profile belongs to current user:
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const { setPosts } = useContext(PostContext);

  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Keep user on refresh:
  const getUser = async () => {
    setIsLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const { data } = await axios.get("/api/auth/getUser", config);

      setCurrentUser({ username: data.username });

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
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
    getUser();
    setPosts([]);
    getUserPosts();
  }, []);

  return (
    <div className="profile">
      <div className="posts">
        {error && <span>{error}</span>}
        <h2>
          {match.params.username === currentUser.username
            ? isLoading
              ? "Loading..."
              : "Your posts"
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
    </div>
  );
};

export default Profile;
