import mongoose from 'mongoose';
import dotenv from 'dotenv';
import drinkSchema from './models/drinkSchema.js';
import categorySchema from './models/categorySchema.js';
import orderSchema from './models/orderSchema.js';

dotenv.config();
const currentDb =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_LINK
    : 'mongodb://127.0.0.1:27017/boms';

mongoose
  .connect(currentDb || '', {})
  .then(() => {
    console.log('DataBase is Connected');
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;
db.on('error', (err) => {
  console.error(err);
});

const Drinks = mongoose.model('drinks', drinkSchema);
const Categories = mongoose.model('categories', categorySchema);
const Orders = mongoose.model('orders', orderSchema);

export { Drinks, Categories, Orders };
