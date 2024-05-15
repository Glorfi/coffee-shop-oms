import { lazy } from 'react';

export const OrderStatusPage = lazy(() =>
  import('./ui/OrderStatusPage').then((module) => ({
    default: module.OrderStatusPage,
  }))
);
