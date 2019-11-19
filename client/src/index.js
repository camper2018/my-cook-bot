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
    // console.log(response.data[0].ingredients);
    // let  randomized = shuffle(response.data)
    let result = response.data.map(item => {
      let groceryList = item.ingredients.map(val => {
        // return `${val.name}: ${val.amount} ${val.unit}`
        return {name: val.name, amount: val.amount, unit: val.unit}
      });

      return {name:item.name, ingredients: groceryList};
    });
    // console.log(result);
    return shuffle(result);
  })
  .then((shuffled)=> {
    // console.log(shuffled.slice(0, count));
    cb(shuffled.slice(0, count));
  })
  .catch((error)=> {
    cb(error);
  });
  // $.ajax({
  //   url: "http://127.0.0.1:3000/food-items",
  //   method:'GET',
  //   success:(data) => {
  //     console.log(data);
  //   },
  //   error:(err)=> {
  //     console.log(err);
  //   }
  // });
}
// fetchItems(1, (i => {
//   // console.log(i.ingredients[0].name);
// }));
module.exports = {fetchItems};