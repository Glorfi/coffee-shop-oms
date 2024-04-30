import { ICategory } from '@/entities/category/model/types';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

interface IUpdateRequest {
  id: string;
  body: { nameRU: string; nameEN: string; nameAM: string };
}

const getCatergories = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    updateCategory: builder.mutation<ICategory, IUpdateRequest>({
      query: ({id, body}) => ({
        url: `${API_PATH.CATEGORIES}/${id}`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useUpdateCategoryMutation } = getCatergories;
