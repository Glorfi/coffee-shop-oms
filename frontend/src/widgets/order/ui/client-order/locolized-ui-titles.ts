import { IUITiltle } from '@/shared/constants/types/ui-title';

export const BUTTON_OPEN_TITLE: IUITiltle = {
  ru: 'Корзина',
  en: 'Cart',
  hy: 'Զամբյուղ',
};
interface IStatus {
  created: IUITiltle;
  processing: IUITiltle;
  ready: IUITiltle;
  delivered: IUITiltle;
}

export const ORDER_WIDGET_TITLE: IUITiltle = {
  ru: 'Ваш заказ создан',
  en: 'Your order has been placed',
  hy: 'Ձեր պատվերը ստեղծվել է',
};

export const ORDER_WIDGET_SUBTITLE: IUITiltle = {
  ru: 'Бариста скоро начнет готовить ваш заказ',
  en: 'The barista will start preparing your order soon',
  hy: 'Շուտով բարիստան կսկսի պատրաստել ձեր պատվերը',
};

