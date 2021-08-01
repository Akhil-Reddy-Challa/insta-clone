import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { db } from "./firebase";
import firebase from "firebase";

function Post(props) {
  const { username, imageUrl, caption, postId, currentUser } = props;
  // console.log(currentUser);
  // console.log(postId);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          const comments = snapshot.docs.map((doc) => doc.data());
          // console.log(comments);
          setComments(comments);
        });
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [postId]);
  const postComment = (event) => {
    event.preventDefault();
    // console.log("Posting it");
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: currentUser.displayName,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
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
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username + ": "}</strong>
            {comment.text}
          </p>
        ))}
      </div>
      {currentUser && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
