const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/goFood';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    const FoodItem = mongoose.model('food_item', new mongoose.Schema({}), 'food_items');
    const data = await FoodItem.find({}).exec();
    global.food_items = data;
    //console.log(global.food_items)
    const FoodCategory = mongoose.model('food_icategory', new mongoose.Schema({}), 'food_category');
    const cateData = await FoodCategory.find({}).exec();
    global.food_category= cateData; 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with an error
  }
};

module.exports = mongoDB;
