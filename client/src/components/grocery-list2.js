import React from 'react';

// formats the data from groceries and diaplays it as a list
const GroceryList = ({groceries,handleEraseIngredient}) => {
  return (
    <div className="card">
      <h1>Grocery List</h1>
      <ul>
      {
        groceries.map(item =>
          <li key={item} className="erase-ingredient" onClick={handleEraseIngredient}>
            {item}
          </li>

        )
      }
      </ul>
    </div>
  );

}
export default GroceryList;