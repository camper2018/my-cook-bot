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
  ingredients: [{name:{type:String,required:true}, amount:{type: Number},unit:{type:String}}]
});
// create collection (table) using mongoose model

const foodItem = mongoose.model('foodItem',foodSchema);

let item = {
  name:'omlette',
  ingredients: [{name:'egg', count:4, unit:'none'},
              {name:'bellPepper', count:1/2,unit:'none'},
              {name: 'mushroom', count: 4,unit: 'none'},
              {name: 'spinach', count: 1/4, unit: 'cup'},
              {name: 'cheese', count: 1/4, unit:'cup'}]

}

connect()
  .then(async connection => {
    console.log('connection successful!');
  })
  .catch(e => console.error(e));




const addDish  = (dishItem, cb) => {
  foodItem.create(dishItem).then((response) => {
    cb('item saved')
  })
  .catch((err) => {
    cb('error saving item into database');
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
  foodItem.findOne({name:item},(err, res) => {
    if(err) {
      cb(err);
    }
    cb(res);
  });
}

const deleteItem = (item, cb) => {
  foodItem.findOneAndDelete({name:item}).exec((error, res)=> {
    if(error) {
      cb(error);
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
module.exports.deleteItem = deleteItem;
module.exports.getAll = getAll;

