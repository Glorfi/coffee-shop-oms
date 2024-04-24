import express from 'express';
import { send } from 'process';
import {
  createDrink,
  deleteDrink,
  getDrinks,
  updateDrink,
} from '../controllers/drinks.js';

const drinksRouter = express.Router();

drinksRouter.get('/', getDrinks);
drinksRouter.post('/', createDrink);
drinksRouter.put('/:id', updateDrink);
drinksRouter.delete('/:id', deleteDrink);

export default drinksRouter;
