import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AddPost = ({ getPosts, setAddVisibility, addVisible }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [avatar, setAvatar] = useState();

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
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Created post successful",
      confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
    }).then((result) => {
      if (result.isConfirmed) setSuccess(true);
    });

  };

  useEffect(() => {
    // Gọi hàm getPosts khi component cha được render hoặc khi có sự thay đổi trong posts
    getPosts();
  }, []);

  useEffect(() => {
    if (success) {
      // Set opacity to 0 to close the pop-up
      setAddVisibility(false); // Assuming setAddVisibility is a function to control the visibility
    }
  }, [success]);

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
          <div className="input">
            <label htmlFor="image">image</label>
            <input
               type="file" 
               name="imageEpisode" 
               id="imageEpisode" 
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
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