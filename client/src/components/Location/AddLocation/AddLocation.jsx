import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AddLocation = ({ getLocations, setAddVisibility, addVisible }) => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const addLocation = async (e) => {
    e.preventDefault();
    const body = { name };
    await fetch("/api/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setName("");
    getLocations();
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Created location successful",
      confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
    }).then((result) => {
      if (result.isConfirmed) setSuccess(true);
    });
  };

  useEffect(() => {
    // Gọi hàm getPosts khi component cha được render hoặc khi có sự thay đổi trong posts
    getLocations();
  }, []);

  useEffect(() => {
    if (success) {
      // Set opacity to 0 to close the pop-up
      setAddVisibility(false); // Assuming setAddVisibility is a function to control the visibility
    }
  }, [success]);

  return (
    <div
      className="add-location-modal"
      style={{
        opacity: addVisible ? "1" : "0",
        pointerEvents: addVisible ? "auto" : "none",
      }}
    >
      <form
        onSubmit={(e) => {
          addLocation(e);
        }}
      >
        <h1 className="modal-title">Add a location</h1>
        <div className="input-container">
          <div className="input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Location Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
        </div>

        <div className="btn-container">
          <button type="submit">Add</button>
          <button
            type="button"
            onClick={() => {
              setAddVisibility(false);
            }}
          >
            Close
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
};

export default AddLocation;
