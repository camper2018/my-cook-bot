const axios = require('axios');
var $ = require("jquery");

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

const fetchItems = (count,cb) => {
  axios.get("http://127.0.0.1:3000/food-items")
  .then((response)=> {
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
// fetchItems(1, (i => {
//   // console.log(i.ingredients[0].name);
// }));
module.exports = {fetchItems};