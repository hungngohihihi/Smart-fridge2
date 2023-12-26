import React, { useState, useEffect } from "react";
import ListUsers from "../../components/Forum/ListUser";
import ListPosts from "../../components/Forum/ListPosts";
import SearchPost from "../../components/Forum/SearchPost";
import AddPost from "../../components/Forum/AddPost";
import "./forum.scss";

const Forum = ({ isMobile, username }) => {
  document.title = "FridgeMan - Forum";

  const [addVisible, setAddVisibility] = useState(false);
  const [searchVisible, setSearchVisibility] = useState(false);
  // const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    await fetch("/api/post")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }

  const getUsers = async () => {
    await fetch("/api/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);


  return (
    <div className="forums page">
      <div className="forum-content">
        <h3>{username}'s</h3>
        <h1>Post list</h1>

        <div className="navigation-buttons">
          <button
            onClick={() => {
              setSearchVisibility(true);
            }}
          >
            Search Post
          </button>

          <button
            onClick={() => {
              setAddVisibility(true);
            }}
            style={{ marginLeft: "auto" }}
          >
            Create Post
          </button>
        </div>
      </div>

      <div className="forum-post">
        <AddPost
          getPosts={getPosts}
          setAddVisibility={setAddVisibility}
          addVisible={addVisible}
        />

        <div className="user-post">
          <SearchPost
            email={email}
            setEmail={setEmail}
            title={title}
            setTitle={setTitle}
            posts={posts}
            setPosts={setPosts}
            setSearchVisibility={setSearchVisibility}
            searchVisible={searchVisible}
          />
          <ListUsers
            users={users}
            isMobile={isMobile}
          />
        </div>
        <ListPosts
          posts={posts}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default Forum;
