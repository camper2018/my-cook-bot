import React, {useState,Component} from 'react';
import ReactDom from 'react-dom';
import {fetchItems} from './index';
import GroceryList from './components/grocery-list'
import AddDishForm from './components/add-fooditem-form';
import FormatSearchedData from './components/format-search';
import UpdateDishForm from './components/update-form';
import axios from 'axios';
import $ from 'jquery';
const App= () => {
  const foodList = [];
  const [items, setItems] = useState(foodList);
  const [groceries, setGroceries] = useState({});
  const [view, setview] = useState(1);
  const [searchedData, setSearchedData] = useState(null);
  const [updateItem, setUpdateItem] = useState('');
  const generateList = (e) => {
    let count = Number(e.target.value);
    fetchItems(count,(fetchedItems) =>  {
      setItems(fetchedItems);
      setview(2);
    });
  }
  const generateGroceryList = ()=> {
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
    setGroceries(obj);
    setview(3);
  }
  const handleAdd = ()=> {
    setview(4);
  }
  const SwitchComponent = () => {
    if (view === 2) {
      return (<div className="card">
      <ol>
        {
          items.map((item, i) => <li key={item.name}>{item.name}<button id={item.name} onClick={handleErase}>Erase</button></li>)
        }
      </ol>
    </div>)
    }else if (view === 3) {
      return <GroceryList items={items} groceries={groceries} />
    } else if (view === 4) {
      return <AddDishForm handleSubmitAdd={handleSubmitAdd}/>
    } else if (view === 5) {
      return <FormatSearchedData searchedData={searchedData}/>
    } else if (view === 6) {
      return <UpdateDishForm updateItem={updateItem} handleSubmitUpdate={handleSubmitUpdate}/>
    } else {
      return null
    }
  }
  const handleSubmitAdd = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let ingredients = e.target.ingredients.value;
    let data = {name,ingredients}
    console.log(data);
    $.ajax({
      url: "http://127.0.0.1:3000/food-item/add",
      type: 'POST',
      data: data,
      success: (res => {
        console.log(res);
      alert(`Added ${name} `);
      }),
      error: (error => {
        alert(JSON.stringify(error));
      })
    });
    setview(1);
  }
  const handleSearch = ()=> {
    const searchInput = document.getElementById('search-input').value;
    if (searchInput) {
      axios.get(`http://127.0.0.1:3000/food-item/${searchInput}`)
      .then((response)=> {
        if(response.data) {
          setSearchedData(response.data);
          setview(5);
        } else {
          alert(`${searchInput} not found`);
        }
        document.getElementById('search-input').value = "";
      })
      .catch((error)=> {
        console.error(error);
      });
    }
  }
  const handleUpdate = () => {
    const searchInput = document.getElementById('update-input').value;
    setview(6);
    setUpdateItem(searchInput);
    document.getElementById('update-input').value = "";
  }
  const handleErase = (e) => {
    let name = e.target.id;
    let newItems = items.filter((item)=> {
      return item.name !== name;
    });
    setItems(newItems);
  }
  const handleDelete = ()=> {
    let name = document.getElementById('delete-input').value;
    let url = `http://127.0.0.1:3000/food-item/delete/${name}`;
    axios.delete(url)
    .then((response)=> {
      if (response.data) {
        alert(`${name} deleted`);
      } else {
        alert(`${name} not found`);
      }
    })
    .catch((error)=> {
      alert(`error deleting ${name}`, error);
    });
    document.getElementById('delete-input').value = "";
  }
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let ingredients = e.target.ingredients.value;
    let data = {name,ingredients}
    console.log(data);
    $.ajax({
      url: `http://127.0.0.1:3000/food-item/update/${updateItem}`,
      type: 'POST',
      data: data,
      success: (res => {
        console.log(res);
      alert(`updated ${updateItem} `);
      }),
      error: (error => {
        alert(JSON.stringify(error));
      })
    });
    setview(1);
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
      <button onClick={generateGroceryList}>Generate Grocery List</button>
      <button onClick={handleAdd}>Add Dish</button>

      <button onClick={handleSearch}>Search</button>
      <input id="search-input" type="text" name="search" placeholder="SEARCH dish"/>
      <button onClick={handleUpdate}>Update</button>
      <input id="update-input" type="text" name="update" placeholder="UPDATE dish"/>
      <button onClick={handleDelete}>Delete</button>
      <input id="delete-input" type="text" name="delete" placeholder="DELETE dish"/>

      <div className="main">
        {
          <SwitchComponent/>
        }
      </div>
    </div>
  );
}

ReactDom.render(<App/>, document.getElementById('app'));
