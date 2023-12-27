import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AddRecipe = ({ getRecipes, setAddVisibility, addVisible }) => {
  // let today = new Date();
  // let todayMonth =
  //   today.getMonth() + 1 < 10
  //     ? `0${today.getMonth() + 1}`
  //     : `${today.getMonth() + 1}`;
  // let todayDate = `${today.getFullYear()}-${todayMonth}-${today.getDate()}`;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [success, setSuccess] = useState(false);
  // const [expiration, setExpiration] = useState(todayDate);

  const addRecipe = async (e) => {
    e.preventDefault();
    const body = { name, description, ingredient };
    await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setName("");
    setDescription("");
    setIngredient("");
    // setExpiration(todayDate);
    getRecipes();
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Created item successful",
      confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
    }).then((result) => {
      if (result.isConfirmed) setSuccess(true);
    });
  };

  // useEffect(() => {
  //   setLocation(locationList[0] ? locationList[0].name : "");
  // }, []);

  useEffect(() => {
    // Gọi hàm getPosts khi component cha được render hoặc khi có sự thay đổi trong posts
    getRecipes();
  }, []);

  useEffect(() => {
    if (success) {
      // Set opacity to 0 to close the pop-up
      setAddVisibility(false); // Assuming setAddVisibility is a function to control the visibility
    }
  }, [success]);

  return (
    <div
      className="add-recipe-modal"
      style={{
        opacity: addVisible ? "1" : "0",
        pointerEvents: addVisible ? "auto" : "none",
      }}
    >
      <form
        className="add"
        onSubmit={(e) => {
          addRecipe(e);
        }}
      >
        <h1 className="modal-title">Add a recipe</h1>
        <div className="input-container">
          <div className="input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Recipe Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>

          <div className="input">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Recipe Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </div>

          <div className="input">
            <label htmlFor="ingredient">Ingredient</label>
            <input
              type="text"
              name="ingredient"
              placeholder="Ingredient"
              value={ingredient}
              onChange={(e) => {
                setIngredient(e.target.value);
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

export default AddRecipe;
