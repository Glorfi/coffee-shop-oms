import { lazy, Suspense } from 'react';
import { useAppSelector } from '@/shared/utils/hooks';
import { Box, VStack } from '@chakra-ui/react';
import { ClientHeader } from '@/widgets/header';
import { MenuInfoWidget } from '@/widgets/menu';
import { CreateOrderDrawer } from '@/widgets/order';
import { BGComponent } from '@/shared/ui/BgComponents/BgComponent';

// const BGComponent = lazy(() =>
//   import('@/shared/ui/BgComponents/BgComponent').then((module) => ({
//     default: module.BGComponent,
//   }))
// );

export function MainPage() {
  const order = useAppSelector((state) => state.orderForm.drinks);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BGComponent />
        <VStack
          p={order.length > 0 ? '10px 10px 72px' : '10px'}
          maxW={'600px'}
          m={'0 auto'}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ClientHeader />
            <MenuInfoWidget />
            <CreateOrderDrawer />
          </Suspense>
        </VStack>
      </Suspense>
    </>
  );
}
