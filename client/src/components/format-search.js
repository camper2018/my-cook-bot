import React from 'react';
const FormatSearchedData = ({searchedData})=> {
  let name = searchedData.name;
  let ingredients = searchedData.ingredients;
  return (
  <div className="card">
    <h1>{name}</h1>
    <ul>
    {
      ingredients.map((ingredient)=>
        <li key={ingredient.name}>{ingredient.name}: {ingredient.amount} {ingredient.unit}</li>
      )
    }
    </ul>
  </div>
  );
}
export default FormatSearchedData;