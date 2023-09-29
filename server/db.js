
// const mongoose = require('mongoose');

// const DB_URL = 'mongodb://localhost:27017/FoodieDelights';

// mongoose.connect(DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB', error);
});


mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');

  mongoose.connection.db.listCollections().toArray(function (err,names) {
    console.log(names);
  })
})

module.exports = mongoose;