import React from "react";

const SearchForum = ({
  // setForums,
  // locationList,
  // name,
  // setName,
  // location,
  // setLocation,
  setSearchVisibility,
  searchVisible,
}) => {
  const searchForum = async (e) => {
    e.preventDefault();
    // const searchResult = await fetch(
    //   `/api/Forums/search/?name=${name}&location=${location}`
    // );
    // const jsonResponse = await searchResult.json();
    // await setForums(jsonResponse);
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
          searchForum(e);
        }}
      >
        <h1 className="modal-title">All Posts</h1>
        <div className="input-container">
          <div className="input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Search author"
              // value={name}
              // onChange={(e) => {
              //   setName(e.target.value);
              // }}
            />
          </div>
          <div className="input">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              name="name"
              placeholder="Title post"
              // value={name}
              // onChange={(e) => {
              //   setName(e.target.value);
              // }}
            />
            {/* <select
              name="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            >
              <option value="all-locations">All Locations</option>
              {locationList.map((location, key) => {
                return (
                  <option key={key} value={location.name}>
                    {location.name}
                  </option>
                );
              })}
            </select> */}
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

export default SearchForum;
