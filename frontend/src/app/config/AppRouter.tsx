import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import { APP_PATHS } from '@/shared/constants/AppPaths';
import { useEffect, useState } from 'react';

export const AppRouter = (): JSX.Element => {
  const admin = window.localStorage.getItem('admin');

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((page, index) => {
          return (
            <Route
              path={page.path}
              element={
                page.protected && !admin ? (
                  <Navigate to={APP_PATHS.AUTH} replace />
                ) : (
                  <page.element />
                )
              }
              key={`${page.path}_${index}`}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};
