import React, { useState, useContext } from "react";
import { UserContext } from "../Context";
import { Link } from "react-router-dom";
import axios from "axios";
import { getConfig } from "../utils/reqConfig";
import Comments from "./Comment";

import { TextField, Button, Backdrop } from "@mui/material";

import "./post.css";

const Post = ({ post, getPosts, setError }) => {
    const { currentUser } = useContext(UserContext);
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [showDropdown, toggleShowDropdown] = useState(false);
    const [showEdit, toggleShowEdit] = useState(false);
    const [changes, setChanges] = useState("");

    const deletePost = async (id) => {
        try {
            await axios.delete(`/api/posts/${id}`, getConfig());
            getPosts();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const likePost = async (id) => {
        try {
            await axios.patch(
                `/api/posts/like/${id}`,
                {
                    username: currentUser.username,
                },
                getConfig()
            );

            getPosts();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const commentPost = async (id) => {
        try {
            await axios.post(`/api/comments/${id}`, { comment }, getConfig());
            setComment("");
            setShowComments(true);
            getPosts();
        } catch (error) {
            setError(error.response.data.message);
            setComment("");
        }
    };

    const editPost = async () => {
        toggleShowDropdown(false);
        toggleShowEdit(true);
        setChanges(post.content);
    };

    const saveEdit = async (id) => {
        try {
            await axios.patch(
                `/api/posts/edit/${id}`,
                { content: changes },
                getConfig()
            );
            toggleShowEdit(false);
            getPosts();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const toggleEditBackdrop = () => {
        toggleShowEdit(false);
        setChanges(post.content);
    };

    const toggleDropdown = () => {
        toggleShowDropdown(!showDropdown);
    };

    return (
        <>
            {showEdit && (
                <div className="edit-post">
                    <div className="edit-post-flex">
                        <p>Your post: {post.content}</p>
                        <TextField
                            className="textfield"
                            id="filled-basic"
                            variant="filled"
                            style={{ background: "white" }}
                            multiline
                            rows={2}
                            value={changes}
                            onChange={(e) => setChanges(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ marginTop: "10px", width: "100%" }}
                            size="large"
                            onClick={() => saveEdit(post._id)}
                            disabled={post.content === changes.trim()}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            )}
            <div className="post">
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={showEdit}
                    onClick={() => toggleEditBackdrop()}
                />

                <div className="post-header">
                    <div className="name-date">
                        <h3>
                            <Link to={`/profile/${post.username}`}>
                                {post.username}
                            </Link>
                        </h3>
                        <h6>{post.date.slice(4, 24)}</h6>
                    </div>

                    {currentUser.username === post.username && (
                        <div className="dropdown">
                            <div
                                className="dropdown-menu-button"
                                onClick={() => toggleDropdown()}
                            >
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            {showDropdown && (
                                <div className="dropdown-contents">
                                    <a onClick={() => editPost()}>Edit</a>
                                    <a onClick={() => deletePost(post._id)}>
                                        Delete
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <hr />
                <p>{post.content}</p>
                <hr />
                {post.likes > 0 && (
                    <>
                        <span>{post.likes}</span>
                        <hr />
                    </>
                )}
                <div className="like-comment">
                    <button onClick={() => likePost(post._id)}>
                        {post.likedBy.includes(currentUser.username)
                            ? "unlike"
                            : "like"}
                    </button>
                </div>
                <hr />

                <div className="post-comment">
                    <TextField
                        size="small"
                        id="filled-basic"
                        variant="filled"
                        label="Comment"
                        style={{
                            background: "white",
                            width: "80%",
                        }}
                        autoComplete="off"
                        InputProps={{ disableUnderline: true }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{
                            width: "20%",
                            minHeight: "48px",
                            borderRadius: "0px",
                            boxShadow: "none",
                        }}
                        disabled={!comment}
                        onClick={() => commentPost(post._id)}
                    >
                        Post
                    </Button>
                </div>

                <div className="toggle-comments">
                    {showComments && post.comments.length > 0 && (
                        <a onClick={() => setShowComments(false)}>
                            Hide comments
                        </a>
                    )}
                    {showComments
                        ? post.comments.map((comment) => {
                              return (
                                  <div key={comment._id}>
                                      <Comments
                                          postid={post._id}
                                          comment={comment}
                                          getPosts={getPosts}
                                          setError={setError}
                                      />
                                  </div>
                              );
                          })
                        : post.comments.length > 0 && (
                              <a onClick={() => setShowComments(true)}>
                                  Show comments
                              </a>
                          )}
                </div>
            </div>
        </>
    );
};

export default Post;
