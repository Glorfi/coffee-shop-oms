import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { langRouter } from '@/shared/utils/lang-slice';
import { mainApi } from '@/shared/utils/main-api-router';
import { categoryListSlice } from '@/entities/category';
import { orderFormSlice } from '@/entities/order';
import { socketSlice } from '@/app/store/socket-slice';
import { socketMiddleware } from './socket-middleware';

import { orderSocketSlice } from '@/features/order';

const socketReducer = combineReducers({
  state: socketSlice.reducer,
  orders: orderSocketSlice.reducer,
});

export const store = configureStore({
  reducer: {
    [langRouter.reducerPath]: langRouter.reducer,
    [categoryListSlice.reducerPath]: categoryListSlice.reducer,
    [orderFormSlice.reducerPath]: orderFormSlice.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
    ['socket']: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware).concat(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
