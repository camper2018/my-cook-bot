import React from 'react';

const FormatSearchedData = ({searchedData,handleAddToList})=> {
  if (searchedData) {
    let name = searchedData.name;
    let ingredients = searchedData.ingredients;
    let recipe = searchedData.recipe;
    return (
    <div className="card">
      <button className="add-to-list-btn" onClick={handleAddToList}>Add To List</button>
      <h1>{name}</h1>
      <ul>
      {
        ingredients.map((ingredient)=>
          <li key={ingredient.name}>{ingredient.name}: {ingredient.amount} {ingredient.unit}</li>
        )
      }
      </ul>
      <h2>RECIPE:</h2>
      <p>{recipe}</p>
    </div>
    );
  }
  return null;
}
export default FormatSearchedData;