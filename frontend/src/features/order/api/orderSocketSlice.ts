import { IOrder, IOrderForm } from '@/entities/order';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  incomingOrder: IOrder | null;
  placeOrder: { data: IOrder | null; error: any };
  updateOrderStatus: { data: IOrder | null; error: any };
}

const initialState: IInitialState = {
  incomingOrder: null,
  placeOrder: { data: null, error: null },
  updateOrderStatus: { data: null, error: null },
};

const getIncomingOrdersAction = (
  state: IInitialState,
  action: PayloadAction<IOrder>
) => {
  state.incomingOrder = action.payload;
  return state;
};

const placeOrderAction = (
  state: IInitialState,
  action: PayloadAction<IOrderForm>
) => {
  return state;
};

const onPlaceOrderSucessAction = (
  state: IInitialState,
  action: PayloadAction<IOrder>
) => {
  state.placeOrder.data = action.payload;
};

const onPlaceOrderErrorAction = (
  state: IInitialState,
  action: PayloadAction<any>
) => {
  state.placeOrder.error = action.payload;
};

const enterOrderRoomAction = (
  state: IInitialState,
  action: PayloadAction<IOrder>
) => {
  return state;
};

const updateOrderStatusAction = (
  state: IInitialState,
  action: PayloadAction<IOrder>
) => {
  return state;
};

const onUpdateOrderSuccessAction = (
  state: IInitialState,
  action: PayloadAction<IOrder>
) => {
  state.updateOrderStatus.data = action.payload;
};

const onUpdateOrderErrorAction = (
  state: IInitialState,
  action: PayloadAction<any>
) => {
  state.updateOrderStatus.error = action.payload;
};

export const orderSocketSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getIncomingOrders: getIncomingOrdersAction,
    placeOrder: placeOrderAction,
    onPlaceOrderSucess: onPlaceOrderSucessAction,
    onPlaceOrderError: onPlaceOrderErrorAction,
    enterOrderRoom: enterOrderRoomAction,
    updateOrderStatus: updateOrderStatusAction,
    onUpdateOrderSuccess: onUpdateOrderSuccessAction,
    onUpdateOrderError: onUpdateOrderErrorAction,
  },
});

export const {
  getIncomingOrders,
  placeOrder,
  onPlaceOrderSucess,
  onPlaceOrderError,
  enterOrderRoom,
  updateOrderStatus,
  onUpdateOrderSuccess,
  onUpdateOrderError,
} = orderSocketSlice.actions;
