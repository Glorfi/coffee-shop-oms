import { BGComponent } from '@/shared/ui/BgComponents/BgComponent';
import { ClientHeader } from '@/widgets/header';
import { OrderClientWidget } from '@/widgets/order';
import { Box, VStack } from '@chakra-ui/react';

export const OrderStatusPage = (): JSX.Element => {
  return (
    <>
      <BGComponent />
      {/* <BGClientComponent /> */}
      <VStack p={'10px'} maxW={'600px'} m={'0 auto'}>
        <ClientHeader />
        <OrderClientWidget />
      </VStack>
    </>
  );
};
