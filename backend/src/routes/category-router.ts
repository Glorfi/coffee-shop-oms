import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategoriesWithDrinks,
} from '../controllers/categories.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getCategoriesWithDrinks);
categoryRouter.post('/', createCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
