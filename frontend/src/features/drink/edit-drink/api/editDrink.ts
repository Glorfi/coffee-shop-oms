import { ICategory } from '@/entities/category/model/types';
import { IDrink } from '@/entities/drink';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

interface IEditDrinkRequest {
  id: string;
  body: IEditDrinkRequestBody;
}
interface IEditDrinkRequestBody {
  nameRU?: string;
  nameEN?: string;
  nameAM?: string;
  // categoryId?: string;
  variant?: string[];
  size?: ISize[];
}

interface ISize {
  name: string;
  price: number;
}

const getCatergories = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    editDrink: builder.mutation<IDrink, IEditDrinkRequest>({
      query: ({ id, body }) => ({
        url: `${API_PATH.DRINKS}/${id}`,
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

export const { useEditDrinkMutation } = getCatergories;
