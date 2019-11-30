import React from 'react';

// formats the data from groceries2 and diaplays it as a list
const GroceryList2 = ({groceries2,handleEraseIngredient2}) => {
  return (
    <div className="card">
      <h1>Grocery List</h1>
      <ul>
      {
        Object.keys(groceries2).map(item =>
          groceries2[item][1] !== 'unit'?
          <li key={item} className="erase-ingredient" onClick={handleEraseIngredient2}>
            {item} : {groceries2[item][0]}  {groceries2[item][1]}
          </li>
          :
          <li key={item} className="erase-ingredient" onClick={handleEraseIngredient2}>
            {item} : {groceries2[item][0]}
          </li>
        )
      }
      </ul>
    </div>
  );

}
export default GroceryList2;

