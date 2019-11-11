const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql');
const app = express();
const port = 3000;
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let route = path.join(__dirname, '../client/dist');
app.use('/', express.static(route));
app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});

// app.get('/', function (req, res) {
//   res.send('hello world')
// })
