import { IAppRoute } from '@/shared/constants/types/app-route';
import { APP_PATHS } from '@/shared/constants/AppPaths';
import { MainPage } from '@/pages/main';
import { MenuStaticPage } from '@/pages/menu-static';
import { AuthPage } from '@/pages/auth';
import { DashBoardPage } from '@/pages/dashboard';
import { OrderStatusPage } from '@/pages/order-status';
import { AdminMenuPage } from '@/pages/admin-menu';
import { AdminPage } from '@/pages/admin';

export const routes: IAppRoute[] = [
  { path: APP_PATHS.MAIN, element: MainPage },
  // { path: APP_PATHS.MENU, element: MenuStaticPage },
  { path: APP_PATHS.AUTH, element: AuthPage },
  { path: APP_PATHS.ORDER_STATUS, element: OrderStatusPage },
  { path: APP_PATHS.ADMIN, element: AdminPage, protected: true },
  { path: APP_PATHS.ADMIN_MENU, element: AdminMenuPage, protected: true },
  { path: APP_PATHS.DASHBOARD, element: DashBoardPage, protected: true },
];
