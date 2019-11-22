import React from 'react'

const UpdateDishForm = ({handleSubmitUpdate,itemToBeUpdated}) => {

  const inputFormat = `FORMAT: \n(ingredient name : amount as a number : unit) \n(chicken : 2 : lbs \n tomatoes : 4 : tomatoes)`;
  let name = itemToBeUpdated.name;
  let ingredients = itemToBeUpdated.ingredients;
  ingredients = ingredients.map(ingredient => {
    return `${ingredient.name}:${ingredient.amount}:${ingredient.unit}`
  });
  let recipe = itemToBeUpdated.recipe;
  return (
    <form className="card" onSubmit={handleSubmitUpdate}>
      <label className="form-label name">Dish Name: </label>
      <input className="form-input" type="text" name="name" defaultValue={name} placeholder="Dish Name" /><br/>
      <label className="form-label ingredients">Ingredients: </label>
      <textarea className="form-textarea" name="ingredients" defaultValue={ingredients} placeholder={inputFormat}></textarea><br/><br/>
      <label className="form-label recipe">Recipe: </label>
      <textarea className="form-textarea" name="recipe" defaultValue={recipe} placeholder="Enter recipe here"></textarea><br/><br/>
      <input id="form" className="submit-btn" type="submit" value="Edit"></input>
    </form>
  )
}
export default  UpdateDishForm;