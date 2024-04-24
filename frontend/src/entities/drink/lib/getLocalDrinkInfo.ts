import { IDrink } from '../model/types';

export function getLocalDrinkInfo(drink: IDrink, lang: string) {
  let localizedName: string;
  let localizedDescription;
  switch (lang) {
    case 'ru':
      localizedName = drink.nameRU;
      localizedDescription = drink.descriptionRU
      break;
    case 'en':
      localizedName = drink.nameEN;
      localizedDescription = drink.descriptionEN
      break;
    case 'hy':
      localizedName = drink.nameAM;
      localizedDescription = drink.descriptionAM
      break;
    default:
      localizedName = drink.nameEN;
      localizedDescription = drink.descriptionEN // По умолчанию используем английское название
  }
  return { name: localizedName, description: localizedDescription };
}
