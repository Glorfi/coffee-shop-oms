import { Schema } from 'mongoose';
export interface IDrinkSize {
  name: 'regular' | 'large';
  price: number;
}

export interface IDrink extends Document {
  nameRU: string;
  nameEN: string;
  nameAM: string;
  descriptionRU: string;
  descriptionEN: string;
  descriptionAM: string;
  categoryId: Schema.Types.ObjectId;
  variant: ('hot' | 'cold')[];
  size: IDrinkSize[];
}
