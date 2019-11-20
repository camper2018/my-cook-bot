import React, {useState,Component} from 'react';
import ReactDom from 'react-dom';
import {fetchItems} from './index';
import GroceryList from './components/grocery-list'
import AddDishForm from './components/add-fooditem-form';
import FormatSearchedData from './components/format-search';
import axios from 'axios';
const App= () => {
  const foodList = [];
  const [items, setItems] = useState(foodList);
  const [groceries, setGroceries] = useState({});
  const [view, setview] = useState(1);
  const [searchedData, setSearchedData] = useState(null);
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
      setGroceries(obj);
      setview(2);
    });
  }

  const generateGroceryList = ()=> {
    setview(3);
  }
  const addFoodHandler = ()=> {
    setview(4);
  }
  const SwitchComponent = () => {
    if (view === 2) {
      return (<div className="card">
      <ol>
        {
          items.map((item, i) => <li key={i}>{item.name}</li>)
        }
      </ol>
    </div>)
    }else if (view === 3) {
      return <GroceryList items={items} groceries={groceries} />
    } else if (view === 4) {
      return <AddDishForm/>
    } else if (view === 5) {
      return <FormatSearchedData searchedData={searchedData}/>
    } else {
      return null
    }
  }
  const handleSearch = ()=> {
    const searchInput = document.getElementById('search-input').value;
    axios.get(`http://127.0.0.1:3000/food-item/${searchInput}`)
    .then((response)=> {
      setSearchedData(response.data);
      setview(5);
    })
    .catch((error)=> {
      console.error("item not found!", error );
    })
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
      <button onClick={addFoodHandler}>Add Food</button>
      <button onClick={handleSearch}>Search Food</button>
      <input id="search-input" type="text" name="search" placeholder="Enter dish name"/>
      <div className="main">
        {
          <SwitchComponent/>
        }
      </div>
    </div>
  );
}

ReactDom.render(<App/>, document.getElementById('app'));
