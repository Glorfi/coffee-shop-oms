import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICategory } from './types';
import { IDrink } from '@/entities/drink';

const initialState: ICategory[] = [];

const addCategoryListAction = (
  state: ICategory[],
  action: PayloadAction<ICategory[]>
) => {
  return [...state, ...action.payload];
};

const addCategoryAction = (
  state: ICategory[],
  action: PayloadAction<ICategory>
) => {
  state.push(action.payload);
  return state;
};

const updateCategoryAction = (
  state: ICategory[],
  action: PayloadAction<ICategory>
) => {
  const itemIndex = state.findIndex((cat) => cat._id === action.payload._id);
  if (itemIndex !== -1) {
    state[itemIndex] = action.payload;
  }
  return state;
};

const removeCategoryAction = (
  state: ICategory[],
  action: PayloadAction<ICategory>
) => {
  return state.filter((item) => item._id !== action.payload._id);
};

const addDrinkAction = (state: ICategory[], action: PayloadAction<IDrink>) => {
  const { categoryId } = action.payload;
  const catIndex = state.findIndex((cat) => cat._id === categoryId);

  if (catIndex !== -1) {
    const updatedCategories = [...state];
    const updatedCategory = { ...updatedCategories[catIndex] };
    updatedCategory.drinkList = [...updatedCategory.drinkList, action.payload];
    updatedCategories[catIndex] = updatedCategory;
    return updatedCategories;
  }

  return state;
};

const updateDrinkAction = (
  state: ICategory[],
  action: PayloadAction<IDrink>
) => {
  const updatedDrink = action.payload;
  const categoryId = updatedDrink.categoryId;
  const catIndex = state.findIndex((cat) => cat._id === categoryId);
  if (catIndex !== -1) {
    const updatedCategories = state.map((cat) => {
      if (cat._id === categoryId) {
        return {
          ...cat,
          drinkList: cat.drinkList.map((drink) => {
            if (drink._id === updatedDrink._id) {
              return updatedDrink;
            }
            return drink;
          }),
        };
      }
      return cat;
    });
    return updatedCategories;
  }
  return state; // Если категория или напиток не найдены, возвращаем текущее состояние
};

const removeDrinkAction = (
  state: ICategory[],
  action: PayloadAction<IDrink>
) => {
  const { categoryId } = action.payload;
  const catIndex = state.findIndex((cat) => cat._id === categoryId);
  if (catIndex !== -1) {
    const updatedCategories = [...state];
    const updatedCategory = { ...updatedCategories[catIndex] };
    updatedCategory.drinkList = updatedCategory.drinkList.filter(
      (drink) => drink._id !== action.payload._id
    );
    updatedCategories[catIndex] = updatedCategory;
    return updatedCategories;
  }
  return state;
};

export const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState,
  reducers: {
    addCategoryList: addCategoryListAction,
    removeCategory: removeCategoryAction,
    addCategory: addCategoryAction,
    updateCategory: updateCategoryAction,
    addDrink: addDrinkAction,
    removeDrink: removeDrinkAction,
    updateDrink: updateDrinkAction,
  },
});

export const {
  addCategoryList,
  removeCategory,
  addCategory,
  updateCategory,
  addDrink,
  removeDrink,
  updateDrink,
} = categoryListSlice.actions;
