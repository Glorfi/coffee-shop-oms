import { lazy } from 'react';

export const MainPage = lazy(() =>
  import('.//ui/Main').then((module) => ({
    default: module.MainPage,
  }))
);
