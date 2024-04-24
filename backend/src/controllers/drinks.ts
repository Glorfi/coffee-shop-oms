import { NextFunction, Response, Request } from 'express';
import { Categories, Drinks } from '../db/mongoConnector.js';
import { ICreateDrinkRequest } from '../interfaces/requests/ICreateDrink.js';
import { BadRequest } from '../errors/BadRequest.js';
import { IDrink } from '../interfaces/IDrink.js';
import { IUpdateDrinkRequest } from '../interfaces/requests/IUpdateDrinkRequest.js';
import { NotFound } from '../errors/NotFound.js';
import { IDeleteDrinkRequest } from '../interfaces/requests/IDeleteDrinkRequest.js';

export const getDrinks = (req: Request, res: Response, next: NextFunction) => {
  Drinks.find({})
    .then((drinks) => res.send(drinks))
    .catch((err) => next(err));
};

export const createDrink = (
  req: ICreateDrinkRequest,
  res: Response,
  next: NextFunction
) => {
  Drinks.create(req.body)
    .then((drink) => {
      Categories.findById(drink.categoryId)
        .then((cat) => {
          cat?.drinkList?.push(drink._id);
          cat?.save();
          return drink;
        })
        .then((savedDrink) => res.send(savedDrink));
    })
    .catch((err: any) => {
      next(err);
    });
};

export const updateDrink = (
  req: IUpdateDrinkRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Assuming you're passing the drink ID in the request params
  const updateData = req.body; // Assuming your update data is in the request body

  Drinks.findByIdAndUpdate(id, updateData, { new: true })
    .then((updatedDrink) => {
      if (!updatedDrink) {
        throw new NotFound('Drink not found');
      }
      if (updateData.categoryId) {
        Categories.findById(updatedDrink.categoryId)
          .then((cat) => {
            if (cat) {
              // Remove the drink from the old category's drinkList
              cat.drinkList = cat.drinkList.filter(
                (drinkId) => drinkId.toString() !== id.toString()
              );
              // Add the drink to the new category's drinkList
              cat.drinkList.push(updatedDrink._id);
              cat.save();
            }
          })
          .catch((err) => next(err));
      }

      res.send(updatedDrink);
    })
    .catch((err: any) => {
      next(err);
    });
};

export const deleteDrink = (
  req: IDeleteDrinkRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  Drinks.findByIdAndDelete(id)
    .then((deletedDrink) => {
      if (!deletedDrink) {
        throw new NotFound('Drink not found');
      }

      if (deletedDrink.categoryId) {
        Categories.findById(deletedDrink.categoryId)
          .then((cat) => {
            if (cat) {
              cat.drinkList = cat.drinkList.filter(
                (drinkId) => drinkId.toString() !== id.toString()
              );
              cat.save();
            }
          })
          .catch((err) =>
            console.error('Error removing drink from category drinkList:', err)
          );
      }

      res.send(deletedDrink);
    })
    .catch((err: any) => {
      if (err.name === 'CastError') {
        const notFound = new NotFound('Invalid category ID');
        next(notFound);
      } else {
        next(err);
      }
    });
};
