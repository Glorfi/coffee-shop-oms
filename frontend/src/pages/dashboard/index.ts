import { lazy } from 'react';

export const DashBoardPage = lazy(() =>
  import('./ui/DashBoardPage').then((module) => ({
    default: module.DashBoardPage,
  }))
);
