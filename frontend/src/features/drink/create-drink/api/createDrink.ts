import { ICategory } from '@/entities/category/model/types';
import { IDrink } from '@/entities/drink';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

interface ICreateCategoryRequestBody {
  nameRU: string;
  nameEN: string;
  nameAM: string;
}

interface ICreateDrinkRequestBody {
  nameRU: string;
  nameEN: string;
  nameAM: string;
  categoryId: string;
  variant: string[];
  size: ISize[];
}

interface ISize {
  name: string;
  price: number;
}

const getCatergories = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createDrink: builder.mutation<IDrink, ICreateDrinkRequestBody>({
      query: (body) => ({
        url: `${API_PATH.DRINKS}`,
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

export const { useCreateDrinkMutation } = getCatergories;
