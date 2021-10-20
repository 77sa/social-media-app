import React, { useContext, useEffect, useState } from "react";
import { PostContext, UserContext } from "../Context";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { getConfig } from "../utils/reqConfig";
import CreatePost from "../components/CreatePost";

import Post from "../components/Post";

import "./profile.css";

const Profile = ({ history, match }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const { setPosts } = useContext(PostContext);

    const [userPosts, setUserPosts] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async () => {
        try {
            const { data } = await axios.get("/api/auth/getUser", getConfig());

            setCurrentUser({ username: data.username });
        } catch (error) {
            localStorage.removeItem("token");
            history.push("/login");
        }
    };

    const getUserPosts = async () => {
        try {
            const { data } = await axios.get(
                `/api/posts/${match.params.username}`,
                getConfig()
            );

            data.reverse();
            setUserPosts(data);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    useEffect(() => {
        getUser();
        setPosts([]);
        getUserPosts();
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <div className="center">
            <div className="profile">
                {error && <span>{error}</span>}
                {isLoading ? (
                    <div className="progress">
                        <CircularProgress style={{ color: "white" }} />
                    </div>
                ) : (
                    <div className="posts">
                        <div className="profile-info">
                            <h1>{match.params.username}</h1>
                        </div>
                        {match.params.username === currentUser.username && (
                            <CreatePost
                                getPosts={getUserPosts}
                                setError={setError}
                            />
                        )}
                        <h2>
                            {match.params.username === currentUser.username
                                ? "Your posts"
                                : `${match.params.username}s posts`}
                        </h2>
                        {userPosts.map((post) => {
                            return (
                                <Post
                                    key={post._id}
                                    post={post}
                                    currentUser={currentUser}
                                    getPosts={getUserPosts}
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

export default Profile;
