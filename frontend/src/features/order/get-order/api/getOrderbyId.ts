import { ICategory } from '@/entities/category/model/types';
import { IOrder } from '@/entities/order';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

const getOrderById = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderById: builder.query<IOrder, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `${API_PATH.ORDERS}/${id}`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetOrderByIdQuery, useGetOrderByIdQuery } = getOrderById;
