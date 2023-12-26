import React, { useState, useEffect } from "react";

const AddPost = ({ getPosts, setAddVisibility, addVisible }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = async (e) => {
    e.preventDefault();
    const body = { title, content };
    await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setTitle("");
    setContent("");
    getPosts();
  };

  return (
    <div
      className="add-forum-modal"
      style={{
        opacity: addVisible ? "1" : "0",
        pointerEvents: addVisible ? "auto" : "none",
      }}
    >
      <form
        className="add"
        onSubmit={(e) => {
          addPost(e);
        }}
      >
        <h1 className="modal-title">Add a post</h1>
        <div className="input-container">
          <div className="input">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="content">Content</label>
            <input
              type="text"
              name="content"
              placeholder="Post Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="btn-container">
          <button
            className="cancel"
            onClick={(e) => {
              e.preventDefault();
              setAddVisibility(false);
            }}
          >
            Cancel
          </button>
          <button className="add" type="submit">
            Add
          </button>
        </div>
      </form>
      <div
        className="modal-background"
        onClick={() => {
          setAddVisibility(false);
        }}
      ></div>
    </div>
  );
}


export default AddPost;