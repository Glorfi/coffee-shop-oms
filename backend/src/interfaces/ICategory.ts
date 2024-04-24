import mongoose from 'mongoose';

export interface ICategory extends Document {
  nameRU: string;
  nameEN: string;
  nameAM: string;
  drinkList?: mongoose.Types.ObjectId[];
}
