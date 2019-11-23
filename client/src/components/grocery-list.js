import React from 'react';

// formats the data from groceries and diaplays it as a list
const GroceryList = ({groceries,handleEraseIngredient}) => {
  const ingredient = {};
  for (let key in groceries) {
    let unit = '';
    // if key has -unit in it's name, it is a unit, not an ingredient's name
    if (!key.includes('-unit')) {
      // set ingredient's name as a key of ingredient object
      ingredient[key] = groceries[key];
      // if groceries key is a unit (i.e has -unit in it's body),
      //store it as unit
      let unitKey = key.toString() + '-unit';
      if (groceries[unitKey]){
        unit = groceries[unitKey];
      }
    }
    // as we set ingredient keys to ingredient's names (as above),
    // now set their values to be equal to quantity and unit if available.
    if (ingredient[key]) {
      let value = ingredient[key].toString();
      if (unit && unit !== 'unit') {
        ingredient[key] = value + " " + unit;
      } else {
        ingredient[key] = value;
      }
    }
  }
  // render each ingredient name and it's quantity with unit as a list
  return (
    <div className="card">
      <h1>Grocery List</h1>
      <ul>
      {
        Object.keys(ingredient).map(item =>
          <li key={item} className="erase-ingredient" onClick={handleEraseIngredient}>
            {item} : {ingredient[item]}
          </li>
        )
      }
      </ul>
    </div>
  );

}
export default GroceryList;