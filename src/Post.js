import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";

function Post(props) {
  const { username, imageUrl, caption } = props;
  return (
    <div className="post">
      {/* header -> avatar + username */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      {/* image */}
      <img className="post__image" src={imageUrl} alt="ReactImg" />
      {/* username + caption */}
      <h3 className="post__text">
        <strong>{username}</strong> {caption}
      </h3>
    </div>
  );
}

export default Post;
