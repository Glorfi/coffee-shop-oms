import { lazy, Suspense } from 'react';
import { useAppSelector } from '@/shared/utils/hooks';
import { Box, VStack } from '@chakra-ui/react';
import { ClientHeader } from '@/widgets/header';
import { MenuInfoWidget } from '@/widgets/menu';
import { CreateOrderDrawer } from '@/widgets/order';
import { BGComponent } from '@/shared/ui/BgComponents/BgComponent';
import { Footer } from '@/widgets/footer';

export function MainPage() {
  const order = useAppSelector((state) => state.orderForm.drinks);

  return (
    <>
      <BGComponent />
      <VStack
        p={order.length > 0 ? '10px 10px 38px' : '10px 10px 0'}
        maxW={'600px'}
        m={'0 auto'}
      >
        <ClientHeader />
        <MenuInfoWidget />
        <CreateOrderDrawer />
        <Footer />
      </VStack>
    </>
  );
}
