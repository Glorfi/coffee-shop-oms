import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Language = 'en' | 'ru' | 'hy';

const getInitialLanguage = (): Language => {
  const navigatorLanguage = window.navigator.language.substring(0, 2);
  if (navigatorLanguage === 'ru' || navigatorLanguage === 'hy') {
    return navigatorLanguage as Language;
  }
  return 'en';
};

const initialState: { value: Language } = { value: getInitialLanguage() };

const setLanguageAction = (
  state: { value: Language },
  action: PayloadAction<Language>
) => {
  state.value = action.payload;
};

export const langRouter = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLanguage: setLanguageAction,
  },
});

export const { setLanguage } = langRouter.actions;
