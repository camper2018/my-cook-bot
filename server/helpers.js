const axios = require('axios');

// function that shuffles the items in an array
const shuffle = function(array) {
  var shuffled = array.slice();
  for (var i = 0; i < array.length; i++) {
    var index = Math.floor(Math.random() * Math.floor(array.length));
    var temp = shuffled[i];
    shuffled[i] = shuffled[index];
    shuffled[index] = temp;
  }
  return shuffled;
};

// function that fetches all data from database,
//formats the data as required ,
//shuffles and passes a result array of length equal to count argument to the callback.
// used at client side for randomly generating list of dish items
const fetchItems = (count,cb) => {
  axios.get("http://127.0.0.1:3000/food-items")
  .then((response)=> {
    // response.data is an array of objects with name, ingredients and recipe properties
    let result = response.data.map(item => {
      let groceryList = item.ingredients.map(val => {
        return {name: val.name, amount: val.amount, unit: val.unit}
      });
      return {name:item.name, ingredients: groceryList};
    });
    return shuffle(result);
  })
  .then((shuffled)=> {
    cb(shuffled.slice(0, count));
  })
  .catch((error)=> {
    cb(error);
  });
}

// converts the ingredients amount in fraction to a float for database
const convertFractionToFloat = (fraction)=> {
  let split = fraction.split("/");
  let result = parseInt(split[0], 10) / parseInt(split[1], 10);
  return result;
}

// formats the data coming from the client post request to be stored in database
const formatPostDataForDB = (data) => {
  let dish = {
    name: data.name,
    ingredients:[],
    recipe: data.recipe
  }
  let ingredients = data.ingredients.split(",");
  ingredients.forEach((ingredient)=> {
    ingredientChunks = ingredient.split(":");
    let name = ingredientChunks[0];
    let amount = ingredientChunks[1];
    if (amount.includes('/')) {
      amount = convertFractionToFloat(ingredientChunks[1]);
    }
    let unit = ingredientChunks[2];
    dish.ingredients.push({name,amount,unit});
  });
  return dish;
}
const changeCategoriesFormat = (category)=> {
  let index = 0;
  for (var i = 0; i < category.length; i++) {
    if (category.charCodeAt(i) >= 65 && category.charCodeAt(i) <= 90) {
      index = i;
      break;
    }
  }
  let str1 = category.substr(0,index);
  let str2 = category.substr(index);
  str1 = str1[0].toUpperCase() + str1.substr(1);
  let newCategory = (str1 + ' ' + str2);
  return newCategory;
}




module.exports = {formatPostDataForDB,fetchItems,changeCategoriesFormat}