import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context";
import { getConfig } from "../utils/reqConfig";

import "./comment.css";

const Comments = ({ postid, comment, getPosts, setError }) => {
    const { currentUser } = useContext(UserContext);

    const [showDropdown, toggleShowDropdown] = useState(false);

    const likeComment = async (postid, commentid) => {
        try {
            await axios.patch(
                `/api/comments/like/${postid}/${commentid}`,
                {},
                getConfig()
            );
            getPosts();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const deleteComment = async (postid, commentid) => {
        try {
            await axios.delete(
                `/api/comments/delete/${postid}/${commentid}`,
                getConfig()
            );
            getPosts();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const toggleDropdown = () => {
        toggleShowDropdown(!showDropdown);
    };

    return (
        <div className="comment" key={comment._id}>
            <div className="comment-header">
                <div className="name-date">
                    <h4>
                        <Link to={`/profile/${comment.username}`}>
                            {comment.username}
                        </Link>
                    </h4>
                    <h5>{comment.date.slice(4, 24)}</h5>
                </div>

                {currentUser.username === comment.username && (
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
                            <div className="dropdown-contents-comments">
                                <a>Edit</a>
                                <a
                                    onClick={() =>
                                        deleteComment(postid, comment._id)
                                    }
                                >
                                    Delete
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <hr />

            {comment.likes > 0 && (
                <>
                    <span>{comment.likes}</span>
                    <hr />
                </>
            )}

            <div className="like-comment">
                <button onClick={() => likeComment(postid, comment._id)}>
                    {comment.likedBy.includes(currentUser.username)
                        ? "unlike"
                        : "like"}
                </button>
                <hr />
            </div>
            <p>{comment.comment}</p>
        </div>
    );
};

export default Comments;
