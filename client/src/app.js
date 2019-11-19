import React, {useState,Component} from 'react';
import ReactDom from 'react-dom';
// import $ from 'jquery';
import {fetchItems} from './index';
import GroceryList from './components/grocery-list'

const App= () => {
  const foodList = [];
  const [items, setItems] = useState(foodList);
  const [view, setView] = useState('main');
  const [groceries, setGroceries] = useState({});
  const generateList = (e) => {
    let count = Number(e.target.value);
    fetchItems(count,(items) =>  {
      let result = [];
       let obj = {};
      items.forEach((item)=> {
        result = result.concat(item.ingredients);
      });
      result.forEach(ingredient => {
        if (obj[ingredient.name]) {
          obj[ingredient.name] += ingredient.amount;
          obj[ingredient.name + "-unit"] = ingredient.unit;
        } else {
          obj[ingredient.name] = ingredient.amount;
          obj[ingredient.name + "-unit"] = ingredient.unit;
        }
      });
      setItems(items);
      setView('main');
      setGroceries(obj);
    });
  }

  const generateGroceryList = ()=> {
    setView('grocery-list');
  }
  return (
    <div>
      <center>
        <h1>
          Welcome To Your Cook Bot
        </h1>
      </center>
      <label>List food items for </label>
      <select onChange={generateList} name="food-list" id="food-select">
        <option value="0">none</option>
        <option value="1">one day</option>
        <option value="7">a week</option>
        <option value="30">a month</option>
      </select>

      <button onClick={generateGroceryList}>Generate Food List</button>

      <div className="main">
        {view === 'grocery-list'
          ? <GroceryList items={items} groceries={groceries} />
          : (<ol>
          {
            items.map((item, i) => <li key={i}>{item.name}</li>)
          }
        </ol>)
        }
      </div>
    </div>
  );
}
ReactDom.render(<App/>, document.getElementById('app'));
