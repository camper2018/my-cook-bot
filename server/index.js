const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
let route = path.join(__dirname, '../client/dist');
app.use('/', express.static(route));
app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});

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
    let unit = ingredientChunks[2];
    dish.ingredients.push({name,amount,unit});
  });
  return dish;
}
app.get('/food-items', (req, res)=> {
  db.getAll((result)=> {
    res.send(result);
  });
});
// app.get('/food-item', (req, res) => {
//   db.getAll((result)=> {
//     res.send(result.data[0]);

//   })
// })
app.get('/food-item/:name', (req, res) => {
  let item = req.params.name;
  db.findDish(item, (result) => {
     res.json(result);
  });
});
app.post('/food-item/add',(req, res)=> {
  let item = req.body;
  let dishItem = formatPostDataForDB(item);
  db.addDish(dishItem, (result)=> {
    res.send(result);
  })
});
app.post('/food-item/update/:name', (req, res)=> {
  let item = req.params.name;
  let newItem = req.body;
  let dishItem = formatPostDataForDB(newItem);
  db.updateDish(item, dishItem, (result)=> {
    res.send(result);
  })
});
app.delete('/food-item/delete/:name', (req, res)=> {
  let item = req.params.name;
  db.deleteDish(item,(result)=> {
    res.send(result);
  });
});

