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
  variant: string[];
  size: ISize[];
  __v: number;
}

interface ISize {
  name: string;
  price: number;
  _id: string;
}