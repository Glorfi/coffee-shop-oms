import { configureStore } from '@reduxjs/toolkit';

import { langRouter } from '@/shared/utils/lang-slice';
import { mainApi } from '@/shared/utils/main-api-router';

export const store = configureStore({
  reducer: {
    [langRouter.reducerPath]: langRouter.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
