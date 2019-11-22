import React from 'react'

const UpdateDishForm = ({handleSubmitUpdate}) => {

  const inputFormat = `FORMAT: \n(ingredient name : amount as a number : unit) \n(chicken : 2 : lbs \n tomatoes : 4 : tomatoes)`;
  return (
    <form className="card" onSubmit={handleSubmitUpdate}>
      <label className="form-label name">Dish Name: </label>
      <input className="form-input" type="text" name="name" placeholder="Dish Name" /><br/>
      <label className="form-label ingredients">Ingredients: </label>
      <textarea className="form-textarea" name="ingredients" placeholder={inputFormat}></textarea><br/><br/>
      <label className="form-label recipe">Recipe: </label>
      <textarea className="form-textarea" name="recipe" placeholder="Enter recipe here"></textarea><br/><br/>
      <input id="form" className="submit-btn" type="submit" value="Edit"></input>
    </form>
  )
}
export default  UpdateDishForm;