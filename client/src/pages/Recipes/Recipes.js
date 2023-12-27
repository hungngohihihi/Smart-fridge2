import React, { useState, useEffect } from "react";
import ListRecipes from "../../components/Recipe/ListRecipe";
import Notification from "../../components/Noti/Notification";
import "./recipes.scss";
import AddRecipe from "../../components/Recipe/AddRecipe/AddREcipe";


const Recipes = ({ isMobile, username }) => {
  document.title = "FridgeMan - Recipes";

  const [addVisible, setAddVisibility] = useState(false);
  const [searchVisible, setSearchVisibility] = useState(false);

  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("");

  const getRecipes = async () => {
    await fetch("/api/recipes")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
      });
  };

  useEffect(() => {
    getRecipes();
  }, [recipes]);

  return (
    <div className="recipes page">
      <div className="recipe-content">
        <h3>{username}'s</h3>
        <h1>Recipes</h1>
        <div className="navigation-buttons">
          {<button
            onClick={() => {
              setAddVisibility(true);
            }}
          >
            Add Recipe
          </button>
          /* 
          <button
            onClick={() => {
              setSearchVisibility(true);
            }}
          >
            Search Recipe
          </button> */}
        </div>

        <AddRecipe
          getRecipes={getRecipes}
          setAddVisibility={setAddVisibility}
          addVisible={addVisible}
        />

        <ListRecipes
          getRecipes={getRecipes}
          recipes={recipes}
          setRecipes={setRecipes}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default Recipes;