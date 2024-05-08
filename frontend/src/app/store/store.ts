import { configureStore } from '@reduxjs/toolkit';

import { langRouter } from '@/shared/utils/lang-slice';
import { mainApi } from '@/shared/utils/main-api-router';
import { categoryListSlice } from '@/entities/category';
import { orderFormSlice } from '@/entities/order';

export const store = configureStore({
  reducer: {
    [langRouter.reducerPath]: langRouter.reducer,
    [categoryListSlice.reducerPath]: categoryListSlice.reducer,
    [orderFormSlice.reducerPath]: orderFormSlice.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
