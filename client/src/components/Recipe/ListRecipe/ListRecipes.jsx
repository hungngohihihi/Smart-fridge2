import React from "react";

const ListRecipes = ({ recipes, getRecipes, setRecipes, isMobile }) => {
  const deleteRecipes = async (id) => {
    await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });
    getRecipes();
  };
  const MobileList = () => {
    return (
      <div className="recipe-list">
        {recipes.map((recipe) => {
            let color = {
              text: "",
              background: "",
            };
            return (
              <div className="recipe-list-item" key={recipe.recipe_id}>
                <div className="row-1">
                  <p className="name">{recipe.name}</p>
                  <p className="description">{recipe.description}x</p>
                </div>
                <div className="row-2">
                  <p className="ingredient">{recipe.ingredient}</p>
                </div>
                <div className="row-3">
                  <button
                    onClick={() => {
                      deleteRecipes(recipe.recipe_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const DesktopList = () => {
    return (
      <table className="recipe-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Ingredient</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
        {recipes.map((recipe) => {
            let color = {
              text: "",
              background: "",
            };
            return (
              <div className="recipe-list-item" key={recipe.recipe_id}>
                <div className="row-1">
                  <p className="name">{recipe.name}</p>
                  <p className="description">{recipe.description}x</p>
                </div>
                <div className="row-2">
                  <p className="ingredient">{recipe.ingredient}</p>
                </div>
                <div className="row-3">
                  <button
                    onClick={() => {
                      deleteRecipes(recipe.recipe_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </tbody>
      </table>
    );
  };
  return (
    <div className="list-recipes">
        {isMobile ? <MobileList /> : <DesktopList />}
    </div>
);
};

export default ListRecipes;
