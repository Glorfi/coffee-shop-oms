import { ICategory } from "../model/types";

export function getLocalCategory(category: ICategory, lang: string) {
  let localizedName: string;
    switch (lang) {
      case 'ru':
        localizedName = category.nameRU;
        break;
      case 'en':
        localizedName = category.nameEN;
        break;
      case 'hy':
        localizedName = category.nameAM;
        break;
      default:
        localizedName = category.nameEN; // По умолчанию используем английское название
    }
    return localizedName
}