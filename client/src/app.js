import React, {useState,Component} from 'react';
import ReactDom from 'react-dom';
// import $ from 'jquery';
import {fetchItems} from './index';
import GroceryList from './components/grocery-list'
import AddDishForm from './components/add-fooditem-form';
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
      <label className="select-label">List food items for </label>
      <select onChange={generateList} name="food-list" className="food-select">
        <option value="0">none</option>
        <option value="1">1 day</option>
        <option value="2">2 days</option>
        <option value="3">3 days</option>
        <option value="4">4 days</option>
        <option value="5">5 days</option>
        <option value="6">6 days</option>
        <option value="7">1 week</option>
        <option value="14">2 weeks</option>
        <option value="21">3 weeks</option>
        <option value="30">1 month</option>
      </select>

      <button onClick={generateGroceryList}>Generate Food List</button>

      <button>Add Food</button>
      <button>Find Food</button>
      <div className="main">
        {view === 'grocery-list'
          ? <GroceryList items={items} groceries={groceries} />
          : (<div className="card">
              <ol>
                {
                  items.map((item, i) => <li key={i}>{item.name}</li>)
                }
              </ol>
            </div>)
        }
      </div>
    </div>
  );
}
ReactDom.render(<App/>, document.getElementById('app'));
