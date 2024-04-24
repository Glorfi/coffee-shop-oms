import { ICategory } from '@/entities/category/model/types';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

const getCatergories = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteCategory: builder.mutation<ICategory[], string>({
      query: (id) => ({
        url: `${API_PATH.CATEGORIES}/${id}`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteCategoryMutation } = getCatergories;
