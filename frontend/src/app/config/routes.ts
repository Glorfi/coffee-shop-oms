import { IAppRoute } from '@/shared/constants/types/app-route';
import { APP_PATHS } from '@/shared/constants/AppPaths';
import { MainPage } from '@/pages/main';
import { MenuStaticPage } from '@/pages/menu-static';
import { AdminPage } from '@/pages/admin';
import { AuthPage } from '@/pages/auth';
import { DashBoardPage } from '@/pages/dashboard';

export const routes: IAppRoute[] = [
  { path: APP_PATHS.MAIN, element: MainPage },
  { path: APP_PATHS.MENU, element: MenuStaticPage },
  { path: APP_PATHS.AUTH, element: AuthPage },
  { path: APP_PATHS.ADMIN, element: AdminPage, protected: true },
  { path: APP_PATHS.DASHBOARD, element: DashBoardPage, protected: true },
];
