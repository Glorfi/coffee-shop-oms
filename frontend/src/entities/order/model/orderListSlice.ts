import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDrinkSelection, IOrder, IOrderForm } from './types';
import { act } from 'react-dom/test-utils';

const initialState: IOrder[] = [];

const addOrderAction = (state: IOrder[], action: PayloadAction<IOrder>) => {
  const newState = [action.payload, ...state];
  return newState;
};

const setInitialOrderListAction = (
  state: IOrder[],
  action: PayloadAction<IOrder[]>
) => {
  const newState = [...action.payload];
  newState.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return newState;
};

const updateOrderAction = (state: IOrder[], action: PayloadAction<IOrder>) => {
  const index = state.findIndex((order) => order._id === action.payload._id);
  if (index !== -1) {
    state[index] = action.payload;
  }
  return state;
};

export const orderListSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
    addItemToOrderList: addOrderAction,
    setInitialOrderList: setInitialOrderListAction,
    replaceOrder: updateOrderAction,
  },
});

export const { addItemToOrderList, setInitialOrderList, replaceOrder } =
  orderListSlice.actions;
