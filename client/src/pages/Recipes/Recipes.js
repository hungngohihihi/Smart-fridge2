import React, { useState, useEffect } from "react";
import ListRecipes from "../../components/Recipe/ListRecipe";
import Notification from "../../components/Noti/Notification";
import "./recipes.scss";


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
  }, []);

  return (
    <div className="recipes page">
      <div className="recipe-content">
        <h3>{username}'s</h3>
        <h1>Recipes</h1>
        <div className="navigation-buttons">
          {/* <button
            onClick={() => {
              setAddVisibility(true);
            }}
          >
            Add Item
          </button>
          <button
            onClick={() => {
              setSearchVisibility(true);
            }}
          >
            Search Item
          </button> */}
        </div>
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
