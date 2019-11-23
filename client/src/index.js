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
const convertFractionToFloat = (fraction)=> {
  let split = fraction.split("/");
  let result = parseInt(split[0], 10) / parseInt(split[1], 10);
  return result;
}

module.exports = {fetchItems,convertFractionToFloat};