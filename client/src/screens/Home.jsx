import React, { useContext, useEffect, useState } from "react";
import { PostContext, UserContext } from "../Context";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Home = ({ history }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    if (!currentUser.username) {
      localStorage.removeItem("token");
      history.push("/login");
    }
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  }, [history]);

  const [content, setContent] = useState("");

  const submitPost = (e) => {
    e.preventDefault();

    // post request then update posts in useEffect
    setPosts([
      ...posts,
      {
        id: uuidv4(),
        username: currentUser.username,
        content: content,
      },
    ]);
  };

  return (
    <div>
      <h2>Hi {currentUser.username}</h2>
      <div>
        <input
          type="text"
          required
          placeholder={`Whats on your mind, ${currentUser.username}?`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" onClick={submitPost} disabled={!content}>
          Post
        </button>
      </div>

      <div>
        <h2>Posts:</h2>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <h3>
                <Link to={`/profile/${post.username}`}>{post.username}</Link>
              </h3>
              <p>{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
