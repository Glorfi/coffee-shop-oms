import { IDrink } from '@/entities/drink';

export interface IOrderForm {
  drinks: IDrinkSelection[];
  totalPrice: number;
}

export interface IDrinkSelection {
  drink: IDrink;
  variant: 'hot' | 'cold';
  size: 'regular' | 'large';
  quantity: number;
  price: number;
}

interface IDrinkPlaced {
  drink: IDrink;
  variant: 'hot' | 'cold';
  size: 'regular' | 'large';
  quantity: number;
  price: number;
}
export interface IOrder {
  orderNumber: number;
  drinks: IDrinkPlaced[];
  status: 'created' | 'processing' | 'ready' | 'delivered';
  totalPrice: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
