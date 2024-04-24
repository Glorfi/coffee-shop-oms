import { IDrink } from '@/entities/drink';

export interface ICategory {
  _id: string;
  nameRU: string;
  nameEN: string;
  nameAM: string;
  drinkList: IDrink[];
  __v: number;
}
