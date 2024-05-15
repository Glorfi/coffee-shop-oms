import { lazy } from 'react';


export const AdminPage = lazy(() =>
  import('./ui/AdminPage').then((module) => ({
    default: module.AdminPage,
  }))
);
