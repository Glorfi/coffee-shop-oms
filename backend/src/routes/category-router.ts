import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategoriesWithDrinks,
  updateCategory,
} from '../controllers/categories.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getCategoriesWithDrinks);
categoryRouter.post('/', createCategory);
categoryRouter.put('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
