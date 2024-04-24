import { createSlice } from '@reduxjs/toolkit';

const initialState: string = 'ru'; //window.navigator.language;

export const langRouter = createSlice({
  name: 'lang',
  initialState,
  reducers: {},
});
