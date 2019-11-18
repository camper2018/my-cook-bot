const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const app = express();
const port = 3000;
const path = require('path');
// const {addDish} = require('../database/index');

// const {findDish} = require('../database/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let route = path.join(__dirname, '../client/dist');
app.use('/', express.static(route));
app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});

app.get('/food-items', (req, res)=> {
  db.getAll((result)=> {
    res.send(result);
  });
});
app.get('/food-item/:name', (req, res) => {
  let item = req.params.name;
  db.findDish(item, (result) => {
     res.send(result);
  });
});
app.post('/food-item/add',(req, res)=> {
  let item = req.body;
  // console.log(item);
  db.addDish(item, (result)=> {
    res.send(result);
  })
});
app.put('/update/:name', (req, res)=> {
  let item = req.params.name;
  let newItem = req.body;
  db.updateDish(item, newItem, (result)=> {
    res.send(result);
  })
});
app.delete('/delete/:name', (req, res)=> {
  let item = req.params.name;
  db.deleteItem(item, (result)=> {
    res.send(result);
  });
});

