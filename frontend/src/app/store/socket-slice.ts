import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { connect } from 'http2';

export interface ISocket {
  id: string | null;
  isEstablishingConnection: boolean;
  isConnected: boolean;
  adminRoomAccessGranted: boolean;
}

const initialState: ISocket = {
  id: null,
  isEstablishingConnection: false,
  isConnected: false,
  adminRoomAccessGranted: false,
};

export const socketSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    connect: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    assignSocketId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    disconnect: (state) => {
      state.isConnected = false;
      state.isEstablishingConnection = false;
    },
    enterAdminRoom: (state) => {
      state.adminRoomAccessGranted = true;
    },
  },
});

export const socket = socketSlice.actions;

// onCreatedOrders: (state, action: PayloadAction<any>) => {
//   state.createdOrders = action.payload;
// },
// placeOrder: (state, action: PayloadAction<any>) => {
//   return state;
// },
// onPlaceOrderSucess: (state, action: PayloadAction<any>) => {
//   state.placeOrder = action.payload;
// },
// onPlaceOrderError: (state, action: PayloadAction<any>) => {
//   state.placeOrder = action.payload;
// },
