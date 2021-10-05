import React, { useContext, useEffect, useState } from "react";
import { PostContext, UserContext } from "../Context";

import "./profile.css";

const Profile = ({ match }) => {
  // will be used to check if profile belongs to current user:
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const { posts } = useContext(PostContext);

  // useEffect to get posts from this user
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const filtered = posts.filter(
      (post) => post.username === match.params.username
    );

    setUserPosts(filtered);
  }, [posts, match.params.username]);

  return (
    <div className="profile">
      <div className="posts">
        <h2>
          {match.params.username === currentUser.username
            ? "Your posts"
            : `${match.params.username}s posts`}
        </h2>
        {userPosts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <p>{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
