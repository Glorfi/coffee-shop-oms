import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICategory } from './types';

const initialState: ICategory[] = [];

const addCategoryListAction = (
  state: ICategory[],
  action: PayloadAction<ICategory[]>
) => {
  return [...state, ...action.payload];
};

export const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState,
  reducers: { addCategoryList: addCategoryListAction },
});

export const { addCategoryList } = categoryListSlice.actions;
