import { ICategory } from '@/entities/category/model/types';
import { IOrder } from '@/entities/order';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

const getTodayOrders = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodayOrders: builder.query<IOrder[], void>({
      query: () => ({
        url: `${API_PATH.ORDERS_TODAY}`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetTodayOrdersQuery } = getTodayOrders;
