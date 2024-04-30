import { IDrink } from '@/entities/drink';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

const getCatergories = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteDrink: builder.mutation<IDrink, string>({
      query: (id) => ({
        url: `${API_PATH.DRINKS}/${id}`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteDrinkMutation } = getCatergories;
