import { IDrink } from '@/entities/drink';

export interface ISelectDrink {
  drink: IDrink;
  variant: string;
  size: string;
  quantity: number;
  price: number;
}
