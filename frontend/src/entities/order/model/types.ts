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
