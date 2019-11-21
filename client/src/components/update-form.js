import React, { useState } from 'react'
import $ from 'jquery';
const UpdateDishForm = ({updateItem}) => {

  const inputFormat = `FORMAT: \n(ingredient name : amount as a number : unit) \n(chicken : 2 : lbs \n tomatoes : 4 : tomatoes)`;
  const url = `http://127.0.0.1:3000/update/${updateItem}`;
  return (
    <form className="card" action={url}  method="post">
      <label className="form-label">Dish Name: </label>
      <input className="form-input" type="text" name="name" placeholder="Dish Name" /><br/>
      <label className="form-label">Ingredients: </label>
      <textarea className="form-textarea" name="ingredients" placeholder={inputFormat}></textarea><br/><br/>
      <input className="submit-btn" type="submit" value="Edit"></input>
    </form>
  )
}
export default  UpdateDishForm;