const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/food-dish')
mongoose.Promise = global.Promise;
const connect = () => {
  // returns a mongoose promise
  return mongoose.connect('mongodb://localhost:27017/food-dishes',{useNewUrlParser: true,useUnifiedTopology: true});
}
// define model schema
const foodSchema = new mongoose.Schema({
  name: {type: String, required: true,  useCreateIndex: true},
  ingredients: [{name:{type:String,required:true}, amount:{type: Number},unit:{type:String}}],
  recipe:String
});

// create collection (table) using mongoose model
const foodItem = mongoose.model('foodItem',foodSchema);

// start connection
connect()
  .then(async connection => {
    console.log('connection successful!');
  })
  .catch(e => console.error(e));


// CRUD functions:

const addDish  = (dishItem, cb) => {
  foodItem.create(dishItem).then((response) => {
    cb(`${dishItem.name} saved`)
  })
  .catch((err) => {
    cb(`error saving ${dishItem.name} into database`);
  });
};
const updateDish = (dishItem,newDish,cb) => {
  foodItem.findOneAndUpdate({name:dishItem}, newDish, {useFindAndModify: false}).exec((err, res)=> {
    if(err) {
      cb(err);
    } else {
      cb('item updated');
    }
  });
}
const findDish = (item, cb) => {
  foodItem.findOne({name:item}).exec((err, res) => {
    if(err) {
      cb(err);
    }
    cb(res);
  });
}

const deleteDish = (item, cb) => {
  foodItem.findOneAndDelete({name:item},{useFindAndModify: false}).exec((err, res)=> {
    if(err) {
      cb(err);
    } else {
      cb(res);
    }
  })
}
const getAll = (cb)=> {
  foodItem.find({}).exec((err, res)=> {
    if (err) {
      cb(err);
    } else {
      cb(res);
    }
  });
}

module.exports.addDish = addDish;
module.exports.findDish = findDish;
module.exports.updateDish = updateDish;
module.exports.deleteDish = deleteDish;
module.exports.getAll = getAll;

