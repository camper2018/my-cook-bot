import React, {useState} from 'react';
import ReactDom from 'react-dom';
import {fetchItems} from '../../server/helpers';
import GroceryList2 from './components/grocery-list2'
import GroceryList from './components/grocery-list'
import AddDishForm from './components/add-fooditem-form';
import FormatSearchedData from './components/format-search';
import UpdateDishForm from './components/update-form';
import CategoriesList from './components/categories-list';
import axios from 'axios';

const App= () => {
  // items contains fetched data as a return value of fetchItems()- refer index.js
  const [items, setItems] = useState([]);
  // groceries contains generated grocery list from items - refer grocery-list.js
  const [groceries2, setGroceries2] = useState({});
  const [groceries, setGroceries] = useState([]);
  // view is a number that switch rendering between different components via SwitchComponent - see below
  const [view, setview] = useState(1);
  // searchedData is a data returned as a result of search query -refer handleSearch() below
  const [searchedData, setSearchedData] = useState(null);
  // itemToBeUpdated is an object that refers to the item to be updated  - refer handleUpdate() below
  const [itemToBeUpdated, setItemToBeUpdated] = useState(null);
  // categories is an object with properties as various food categories and values an array that stores items in respective category when a client selects a category and clicks on that item.
  let defaultCategories = {freshProduce:[],dairyEggs:[],frozenFood:[],oilCondiments:[],meatsSeafood:[],bakeryBread:[],cerealBreakfast:[],pastaRice:[],soupsCans:[],drinksCoffee:[],cookiesSnacks:[]};
  const [categories,setCategories]= useState(defaultCategories);
  // generates a list of items by fetching from database - refer index.js for fetchItems()
  const generateList = (e) => {
    let count = Number(e.target.value);
    fetchItems(count,(fetchedItems) =>  {
      setItems(fetchedItems);
      setview(2);
    });
  }
  // creates a grocery list by combining ingredients from all the items and stores it in Groceries variable
  // Groceries is used by GroceryList rendering component - refer grocery-list.js

  const generateGroceryList = ()=> {
    let ingredients = [];
    items.forEach((item)=> {
      ingredients = ingredients.concat(item.ingredients);
    });
    let ingredientNames = ingredients.map(ingredient => {
      return ingredient.name;
    });
    ingredientNames = [...new Set(ingredientNames)];
    setGroceries(ingredientNames);
    let select = document.getElementById('category-select');
    select.value = 'default';
    setCategories(defaultCategories);
    setview(3);

  }
  // changes view to render AddDishForm component
  const handleAdd = ()=> {
    setview(4);
  }
  // swiches rendering of different components on the same page
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
      return <GroceryList groceries={groceries} handleEraseIngredient={handleEraseIngredient}/>
    } else if (view === 4) {
      return <AddDishForm handleSubmitAdd={handleSubmitAdd}/>
    } else if (view === 5) {
      return <FormatSearchedData handleAddToList={handleAddToList} searchedData={searchedData}/>
    } else if (view === 6) {
      return <UpdateDishForm itemToBeUpdated={itemToBeUpdated} handleSubmitUpdate={handleSubmitUpdate}/>
    } else if (view === 7) {
      return <CategoriesList categories={categories}></CategoriesList>
    } else if (view === 8) {
      return <GroceryList2 groceries2={groceries2} handleEraseIngredient2={handleEraseIngredient2}/>
    } else {
      return null
    }
  }
  // An event handler that submits 'Add Dish' form - refer add-fooditem-form.js
  const handleSubmitAdd = (e) => {
    e.preventDefault();
    let name = e.target.name.value.trim();
    let ingredients = e.target.ingredients.value;
    let recipe = e.target.recipe.value;
    let data = {name,ingredients,recipe};
    axios.post('http://127.0.0.1:3000/food-item/add',data)
    .then((response)=> {
      alert(response.data);
    })
    .catch((error)=> {
      alert(error.message);
    });
    setview(1);
  }
  // fetches the item as per search query and stores it as 'searchedData'
  // changes view to render FormatSearchedData component - refer format-search.js
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
        alert(error.message);
      });
    }
  }
  // sets value of updateItem to input value of update query
  //changes view to render UpdateDishForm component - refer update-form.js
  const handleUpdate = () => {
    const updateInput = document.getElementById('update-input').value;
    document.getElementById('update-input').value = "";
    if (updateInput) {
      axios.get(`http://127.0.0.1:3000/food-item/${updateInput}`)
      .then((result) => {
        if (result.data) {
          let name = result.data.name
          let ingredients = result.data.ingredients;
          let recipe = result.data.recipe;
          let resultObject = {name, ingredients, recipe};
          setItemToBeUpdated(resultObject);
          setview(6);
        } else {
          alert(`${updateInput} is not found in database.Consider adding it first`)
        }
      })
      .catch(error => {
        alert(error.message);
      });
    }
  }
  //Removes/filters the item from the items variable when client clicks on erase button.
  const handleErase = (e) => {
    let name = e.target.id;
    let newItems = items.filter((item)=> {
      return item.name !== name;
    });
    setItems(newItems);

  }
  // deletes the requested item from database
  const handleDelete = ()=> {
    let name = document.getElementById('delete-input').value;
    if (name) {
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
        alert(`error deleting ${name}`, error.message);
      });
      document.getElementById('delete-input').value = "";
    }
  }
  // An event handler that submits 'Update' form - refer update-form.js
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    let name = e.target.name.value.trim();
    let ingredients = e.target.ingredients.value;
    let recipe = e.target.recipe.value;
    let data = {name,ingredients,recipe}
    axios.post(`http://127.0.0.1:3000/food-item/update/${itemToBeUpdated.name}`, data)
    .then((response)=> {
      alert(`updated ${itemToBeUpdated.name} `);
    })
    .catch((error)=> {
      alert(error.message);
    });
    setview(1);
  }
  // when a searched item needs to be added to the lists of items and groceries,
  // this handler on 'Add To List' button checks for any duplicate entry,
  // then adds the searched item to the grocery list
  const handleAddToList = ()=> {
    let wasFound = false;
    items.forEach(item => {
      if (item.name === searchedData.name) {
        wasFound = true;
      }
    });
    if (!wasFound) {
      setItems([...items, searchedData]);
    } else {
      alert(`${searchedData.name} is already in your list`)
    }
    setview(2);
  }
  // removes an ingredient from the grocery list on click
  // also saves the ingredient in a list of selected category in the categories object
  // finally when all items in the list are categorized, it changes view to render
  // <CategoriesList/> - refer categories-list.js
  const handleEraseIngredient = (e)=> {
    let targetLi = e.target;
    targetLi.style.display = 'none';
    let itemToBeRemoved = groceries.filter(item => {
      let val = targetLi.innerHTML.split(":")[0].trim();
        return item === val;
    }).join("");
    let newGroceries = groceries.filter(item=> {
      return item !== itemToBeRemoved;
    });
    setGroceries(newGroceries);
    let select = document.getElementById('category-select');
    let category = select.options[select.selectedIndex].value;
    // the code below will store ingredients in their respective categories
    if (category !== 'default') {
      category = category.split("-");
      category = [category[0]].concat([category[1][0].toUpperCase()+ category[1].substr(1)]).join("");
      let result = categories[category];
      let obj = {}
      obj[category] = [...result,targetLi.innerHTML];
      setCategories({...categories,...obj});
    }
    if (groceries.length === 1){
      setview(7);
    }
  }
  const handleReset = ()=> {
    setCategories(defaultCategories);
  }
  const generateGroceryList2 = ()=> {
    // result is an array of all ingredients, ingredients are objects with name,amount and a unit properties
    let obj = {};
    let names = [];
    let amounts = [];
    let units = [];
    items.forEach((item)=> {
      item.ingredients.forEach(ingredient => {
        names.push(ingredient.name);
        amounts.push(ingredient.amount);
        units.push(ingredient.unit);
      });
    });
    for (var i = 0; i < names.length; i++) {
      if (obj.hasOwnProperty(names[i])){
        if (obj[names[i]][1] === units[i]) {
          obj[names[i]][0]+= amounts[i];
        }
      } else {
        obj[names[i]] = [amounts[i],units[i]];
      }
    }
    setGroceries2(obj);
    setview(8);
    let select = document.getElementById('category-select');
    select.value = 'default';
    setCategories(defaultCategories);
  }

  const handleEraseIngredient2 = (e)=> {
    let targetLi = e.target;
    targetLi.style.display = 'none';
    let itemToBeRemoved = Object.keys({...groceries2}).filter(item => {
      let val = targetLi.innerHTML.split(":")[0].trim();
      return item === val;
    }).join("");
    let newGroceries = groceries2;
    delete newGroceries[itemToBeRemoved];
    setGroceries2(newGroceries);
    let select = document.getElementById('category-select');
    let category = select.options[select.selectedIndex].value;
    // the code below will store ingredients in their respective categories
    if (category !== 'default') {
      category = category.split("-");
      category = [category[0]].concat([category[1][0].toUpperCase()+ category[1].substr(1)]).join("");
      let result = categories[category];
      let obj = {}
      obj[category] = [...result,targetLi.innerHTML];
      setCategories({...categories,...obj});
    }
    if (Object.keys(groceries2).length === 1){
      setview(7);
    }
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
      <label className="select-label">Choose category: </label>
      <select name="category" id="category-select" className="food-select">
        <option value="default">none</option>
        <option value="fresh-produce">fresh produce</option>
        <option value="dairy-eggs">dairy cheese and eggs</option>
        <option value="frozen-food">frozen foods</option>
        <option value="oil-condiments">oil sauces condiments</option>
        <option value="meats-seafood">meats and seafood</option>
        <option value="bakery-bread">bakery and bread</option>
        <option value="pasta-rice">pasta and rice</option>
        <option value="cereal-breakfast">cereal and breakfast</option>
        <option value="soups-cans">soups and cans</option>
        <option value="drinks-coffee">beverages</option>
        <option value="cookies-snacks">cookies snacks and candy</option>
      </select>
      <button onClick={handleReset}>Reset categories</button>
      <button onClick={generateGroceryList2}>Grocery List With Quantity</button>
      <div className="main">
        {
          <SwitchComponent/>
        }
      </div>
    </div>
  );
}

ReactDom.render(<App/>, document.getElementById('app'));
