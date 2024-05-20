import { BGComponent } from '@/shared/ui/BgComponents/BgComponent';
import { AdminHeader } from '@/widgets/header';
import { AdminOrderBoard } from '@/widgets/order';

export const DashBoardPage = (): JSX.Element => {
  return (
    <>
      <BGComponent />
      <AdminHeader />
      <AdminOrderBoard />
    </>
  );
};
