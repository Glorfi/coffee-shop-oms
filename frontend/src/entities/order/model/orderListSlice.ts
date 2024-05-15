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

export const orderListSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
    addItemToOrderList: addOrderAction,
    setInitialOrderList: setInitialOrderListAction,
  },
});

export const { addItemToOrderList, setInitialOrderList } =
  orderListSlice.actions;
