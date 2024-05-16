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

export const ORDER_WIDGET_TITLE: IStatus = {
  created: {
    ru: 'Ваш заказ создан',
    en: 'Your order has been placed',
    hy: 'Ձեր պատվերը ստեղծվել է',
  },
  processing: {
    ru: 'Ваш заказ готовится',
    en: 'Your order is being processed',
    hy: 'Ձեր պատվերը պատրաստվում է',
  },
  ready: {
    ru: 'Ваш заказ готов!',
    en: 'Your order is ready!',
    hy: 'Ձեր պատվերը պատրաստ է:',
  },
  delivered: {
    ru: 'Спасибо за ваш заказ!',
    en: 'Thank you for your order!',
    hy: 'Շնորհակալություն Ձեր պատվերի համար!',
  },
};

export const ORDER_WIDGET_SUBTITLE: IStatus = {
  created: {
    ru: 'Бариста скоро начнет готовить ваш заказ',
    en: 'The barista will start preparing your order soon',
    hy: 'Շուտով բարիստան կսկսի պատրաստել ձեր պատվերը',
  },
  processing: {
    ru: 'Бариста уже готовит ваш напиток!',
    en: 'The barista is already preparing your drink!',
    hy: 'Բարիստան արդեն պատրաստում է ձեր խմիչքը:',
  },
  ready: {
    ru: 'Пожалуйста заберите ваш заказ!',
    en: 'Please pick up your order!',
    hy: 'Խնդրում ենք վերցնել ձեր պատվերը:',
  },
  delivered: {
    ru: 'Приходите к нам еще!',
    en: 'Come to us again!',
    hy: 'Եկեք նորից մեզ մոտ:',
  },
};
