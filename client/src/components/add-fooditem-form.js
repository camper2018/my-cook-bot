import React, { useState } from 'react'

const AddDishForm = props => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }
  return (
    <form action="http://127.0.0.1:3000/food-item/add" method="POST">
      <label>Dish Name</label>
      <input type="text" name="name" value="" />
      <label>Amount</label>
      <input type="number" name="amount" value="0" />
      <input type="text" name="unit" value="" />
      <input type="submit" value="Add new food item" onClick={handleSubmit}></input>
      <button>Add new food item</button>
    </form>
  )
}

export default AddDishForm