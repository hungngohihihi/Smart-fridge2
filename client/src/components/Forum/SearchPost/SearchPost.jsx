import React from "react";

const SearchPost = ({
  title,
  email,
  posts,
  setEmail,
  setTitle,
  setPosts,
  setSearchVisibility,
  searchVisible,
}) => {
  const SearchPost = async (e) => {
    e.preventDefault();
    const searchResult = await fetch(
      `/api/post/search/?email=${email}&title=${title}`
    );
    const jsonResponse = await searchResult.json();
    setPosts(jsonResponse);
    setSearchVisibility(false);
  };

  return (
    <div
      className="search-modal"
      style={{
        opacity: searchVisible ? "1" : "0",
        pointerEvents: searchVisible ? "auto" : "none",
      }}
    >
      <form
        className="search"
        onSubmit={(e) => {
          SearchPost(e);
        }}
      >
        <h1 className="modal-title">Search all posts</h1>
        <div className="input-container">
          <div className="input">
            <label htmlFor="Author">Author</label>
            <input
              type="text"
              name="email"
              placeholder="Search author"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Search title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="btn-container">
          <button type="submit">Search</button>
          <button
            type="button"
            onClick={() => {
              setSearchVisibility(false);
            }}
          >
            Close
          </button>
        </div>
      </form>
      <div
        className="modal-background"
        onClick={() => {
          setSearchVisibility(false);
        }}
      ></div>
    </div>
  );
};

export default SearchPost;
