export interface IDrink {
  _id: string;
  name?: string;
  nameRU: string;
  nameEN: string;
  nameAM: string;
  descriptionRU?: string;
  descriptionEN?: string;
  descriptionAM?: string;
  categoryId: string;
  variant: Array<'hot' | 'cold'>;
  size: ISize[];
  __v: number;
}

interface ISize {
  name: 'regular' | 'large';
  price: number;
  _id: string;
}

export interface ISelectDrink {
  drink: IDrink;
  variant: 'hot' | 'cold';
  size: 'regular' | 'large';
  quantity: number;
  price: number;
}
