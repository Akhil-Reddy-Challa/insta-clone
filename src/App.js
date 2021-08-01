import "./App.css";
import Post from "./Post";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      }));
      setPosts(posts);
    });
  }, []);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      // perform cleanup
      unsubscribe();
    };
  }, [user, username]);
  const signUp = (event) => {
    event.preventDefault();
    console.log("Sign up module");
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
    setOpen(false);
  };
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email + "dsd", password)
      .catch((err) => alert(err.message));
    setOpenSignIn(false);
  };
  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <form action="" className="app__signup">
            <center>
              <img
                alt="Instagram_Clone"
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                srcSet="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png 2x"
              ></img>
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={(e) => signUp(e)}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => {
          setOpenSignIn(false);
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <form action="" className="app__signup">
            <center>
              <img
                alt="Instagram_Clone"
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                srcSet="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png 2x"
              ></img>
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={(e) => signIn(e)}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
          alt="Instagram_Clone"
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          srcSet="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png 2x"
        ></img>
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Log out</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      <h3>Hello User:{username}</h3>
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
