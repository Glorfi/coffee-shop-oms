import { ICategory } from '@/entities/category/model/types';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

interface ICreateCategoryRequestBody {
  nameRU: string;
  nameEN: string;
  nameAM: string;
}

const getCatergories = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<ICategory, ICreateCategoryRequestBody>({
      query: (body) => ({
        url: `${API_PATH.CATEGORIES}`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateCategoryMutation } = getCatergories;
