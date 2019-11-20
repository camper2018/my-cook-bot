import React, { useState } from 'react'

const AddDishForm = (props) => {
  const inputFormat = `FORMAT: \n(ingredient name : amount as a number : unit) \n(chicken : 2 : lbs \n tomatoes : 4 : tomatoes)`;
  return (
    <form className="card" action="http://127.0.0.1:3000/food-item/add" method="POST">
      <label className="form-label">Dish Name: </label>
      <input className="form-input" type="text" name="name" placeholder="Dish Name" /><br/>
      <label className="form-label">Ingredients: </label>
      <textarea className="form-textarea" name="ingredients" placeholder={inputFormat}></textarea><br/><br/>
      <input className="submit-btn" type="submit" value="Add food "></input>
    </form>
  )
}

export default AddDishForm