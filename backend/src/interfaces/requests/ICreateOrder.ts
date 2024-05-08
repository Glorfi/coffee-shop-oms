import { Request } from 'express';
interface IDrinkOrder {
  drinkId: string;
  variant: 'hot' | 'cold';
  size: 'regular' | 'large';
  quantity: number;
}

export interface ICreateOrder extends Request {
  body: IDrinkOrder[];
}
