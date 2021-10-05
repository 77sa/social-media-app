import React, { useContext, useEffect, useState } from "react";
import { PostContext, UserContext } from "../Context";

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
    <div>
      <h2>{match.params.username}</h2>
      {userPosts.map((post) => {
        return (
          <div key={post.id}>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
