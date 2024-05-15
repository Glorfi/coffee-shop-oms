import { lazy } from 'react';

export const AdminMenuPage = lazy(() =>
  import('./ui/AdminMenu').then((module) => ({
    default: module.AdminMenuPage,
  }))
);
