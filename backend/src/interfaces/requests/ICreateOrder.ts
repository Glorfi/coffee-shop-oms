import { Request } from 'express';
export interface IDrinkOrder {
  drinkId: string;
  variant: 'hot' | 'cold';
  size: 'regular' | 'large';
  quantity: number;
  status: 'created' | 'processing' | 'ready' | 'delivered';
  totalPrice: number;
  createdAt: Date;
  orderNumber: number;
}

export interface ICreateOrder extends Request {
  body: IDrinkOrder[];
}
