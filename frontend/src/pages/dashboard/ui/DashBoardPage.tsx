import { BGComponent } from '@/shared/ui/BgComponents/BgComponent';
import { AdminHeader } from '@/widgets/header';
import { AdminOrderBoard } from '@/widgets/order';
import { Box, VStack } from '@chakra-ui/react';

export const DashBoardPage = (): JSX.Element => {
  return (
    <>
      <BGComponent />
      <AdminHeader />
      <AdminOrderBoard />
    </>
  );
};
