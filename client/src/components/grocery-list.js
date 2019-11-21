import React, {useState,Component} from 'react';


const GroceryList = ({items,groceries}) => {
  const groceryList = [];
  const ingredient = {};
  for (var key in groceries) {
    let unit = '';
    if (!key.includes('-unit')) {
      ingredient[key] = groceries[key];
      let unitKey = key.toString() + '-unit';
      unit = groceries[unitKey];
    }
    if (ingredient[key]) {
      let item = ingredient[key].toString();
      ingredient[key] = item + " " + unit;

      groceryList.push(<li>{key}->{ingredient[key]}</li>);
    }
  }
  return (
    <div className="card">
      <h1>Grocery List</h1>
      <ul>
      {
        Object.keys(ingredient).map(item =>
          <li key={item}>{item} : {ingredient[item]}</li>
        )
      }
      </ul>
    </div>
  );

}
export default GroceryList;