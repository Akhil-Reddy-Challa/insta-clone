import "./App.css";
import Post from "./Post";
import { useState, useEffect } from "react";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      }));
      setPosts(posts);
    });
  }, []);
  return (
    <div className="app">
      <div className="app__header">
        <img
          alt="Instagram_Clone"
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          srcSet="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png 2x"
        ></img>
      </div>
      {/*Posts area*/}
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          imageUrl={post.imageUrl}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default App;
