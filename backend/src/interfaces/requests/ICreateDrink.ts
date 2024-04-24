import { Request } from 'express';
import { IDrink } from '../IDrink.js';
export interface ICreateDrinkRequest extends Request {
  body: IDrink
}
