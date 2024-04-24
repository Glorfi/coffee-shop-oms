import { Request } from 'express';
export interface ICreateCategoryRequest extends Request {
  body: {
    nameAM: string;
    nameRU: string;
    nameEN: string;
  };
}
