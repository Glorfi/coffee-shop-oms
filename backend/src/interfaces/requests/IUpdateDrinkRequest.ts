import { Schema } from "mongoose";
import { IDrinkSize } from "../IDrink.js";

export interface IUpdateDrinkRequest {
  params: {
    id: string; // Drink ID
  };
  body: {
    nameRU?: string;
    nameEN?: string;
    nameAM?: string;
    descriptionRU?: string;
    descriptionEN?: string;
    descriptionAM?: string;
    categoryId?: Schema.Types.ObjectId;
    variant?: ('hot' | 'cold')[];
    size?: IDrinkSize[];
  };
}
