import { NextFunction, Response, Request } from 'express';
import { Categories, Drinks } from '../db/mongoConnector.js';
import { ICreateCategoryRequest } from '../interfaces/requests/ICreateCategory.js';
import { BadRequest } from '../errors/BadRequest.js';
import { NotFound } from '../errors/NotFound.js';

export const getCategoriesWithDrinks = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Categories.find({})
    .populate('drinkList')
    .then((populatedCats) => res.send(populatedCats))
    .catch((err) => next(err));
};

export const createCategory = (
  req: ICreateCategoryRequest,
  res: Response,
  next: NextFunction
) => {
  const { nameAM, nameEN, nameRU } = req.body;
  if (!nameAM && !nameEN && !nameRU) {
    throw new BadRequest('No required fields');
  }
  Categories.create(req.body)
    .then((newCat) => res.send(newCat))
    .catch((err) => next(err));
};

export const deleteCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req;
  Categories.findByIdAndDelete(req.params.id)
    .then((deletedCat) => {
      if (!deletedCat) {
        throw new NotFound('Category is not found');
      }
      Drinks.deleteMany({ categoryId: deletedCat._id })
        .then(() => {
          res.send(deletedCat);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const notFound = new NotFound('Invalid category ID');
        next(notFound);
      } else {
        next(err);
      }
    });
};

export const updateCategory = (
  req: ICreateCategoryRequest,
  res: Response,
  next: NextFunction
) => {
  const { nameAM, nameEN, nameRU } = req.body;
  if (!nameAM || !nameEN || !nameRU) {
    throw new BadRequest('No required fields');
  }
  Categories.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    populate: 'drinkList',
  })
    .then((cat) => {
      if (!cat) {
        throw new NotFound('Category is not found');
      }
      res.send(cat);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const notFound = new NotFound('Invalid category ID');
        next(notFound);
      } else {
        next(err);
      }
    });
};
