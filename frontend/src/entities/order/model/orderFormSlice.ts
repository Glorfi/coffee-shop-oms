import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDrinkSelection, IOrderForm } from './types';
import { act } from 'react-dom/test-utils';

const initialState: IOrderForm = { drinks: [], totalPrice: 0 };

export const addDrinkToOrderAction = (
  state: IOrderForm,
  action: PayloadAction<IDrinkSelection>
) => {
  state.drinks.push(action.payload);
  const newTotal =
    action.payload.price * action.payload.quantity + state.totalPrice;
  state.totalPrice = newTotal;
  return state;
};

export const incrementDrinkQuantityAction = (
  state: IOrderForm,
  action: PayloadAction<IDrinkSelection>
) => {
  const orderItemIndex = state.drinks.findIndex(
    (drink) =>
      drink.drink._id === action.payload.drink._id &&
      drink.size === action.payload.size &&
      drink.variant === action.payload.variant
  );
  if (orderItemIndex !== -1) {
    const updatedOrderItemQuantity = state.drinks[orderItemIndex].quantity + 1;
    const updatedOrderItemPrice =
      action.payload.price * updatedOrderItemQuantity;

    const updatedOrderPrice =
      state.totalPrice -
      state.drinks[orderItemIndex].quantity *
        state.drinks[orderItemIndex].price +
      updatedOrderItemPrice;

    state.totalPrice = updatedOrderPrice;
    state.drinks[orderItemIndex] = {
      ...state.drinks[orderItemIndex],
      quantity: updatedOrderItemQuantity,
    };
    return state;
  }
  return state;
};

export const decrementDrinkQuantityAction = (
  state: IOrderForm,
  action: PayloadAction<IDrinkSelection>
) => {
  const orderItemIndex = state.drinks.findIndex(
    (drink) =>
      drink.drink._id === action.payload.drink._id &&
      drink.size === action.payload.size &&
      drink.variant === action.payload.variant
  );
  if (orderItemIndex !== -1) {
    const updatedOrderItemQuantity = state.drinks[orderItemIndex].quantity - 1;
    if (updatedOrderItemQuantity !== 0) {
      const updatedOrderItemPrice =
        action.payload.price * updatedOrderItemQuantity;

      const updatedOrderPrice =
        state.totalPrice -
        state.drinks[orderItemIndex].quantity *
          state.drinks[orderItemIndex].price +
        updatedOrderItemPrice;

      state.totalPrice = updatedOrderPrice;
      state.drinks[orderItemIndex] = {
        ...state.drinks[orderItemIndex],
        quantity: updatedOrderItemQuantity,
      };
      return state;
    }
    const updatedDrinkList = state.drinks.filter(
      (drink, index) => index !== orderItemIndex
    );
    const updatedTotalPrice =
      state.totalPrice - state.drinks[orderItemIndex].price;
    state.totalPrice = updatedTotalPrice;
    state.drinks = updatedDrinkList;
    return state;
  }
  return state;
};

export const orderFormSlice = createSlice({
  name: 'orderForm',
  initialState,
  reducers: {
    addDrinkToOrder: addDrinkToOrderAction,
    incrementDrinkQuantity: incrementDrinkQuantityAction,
    decrementDrinkQuantity: decrementDrinkQuantityAction,
  },
});

export const {
  addDrinkToOrder,
  incrementDrinkQuantity,
  decrementDrinkQuantity,
} = orderFormSlice.actions;
