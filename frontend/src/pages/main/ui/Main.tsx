import { BGClientComponent } from '@/shared/ui/BgComponents/BGClientComponent';
import { BGComponent } from '@/shared/ui/BgComponents/BgComponent';
import { useAppSelector } from '@/shared/utils/hooks';
import { ClientHeader } from '@/widgets/header';
import { MenuInfoWidget } from '@/widgets/menu';
import { CreateOrderDrawer } from '@/widgets/order';
// import { Header } from '@/widgets/header';
// import { BaseLayout } from '@/widgets/layouts';
// import { MenuInfoWidget } from '@/widgets/menu/ui/MenuInfoWidget';
import { Box, VStack, Text, HStack } from '@chakra-ui/react';

export function MainPage() {
  const order = useAppSelector((state) => state.orderForm.drinks);
  return (
    <>
      <BGComponent />
      {/* <BGClientComponent /> */}
      <VStack p={order.length > 0 ? '10px 10px 72px' : '10px'}>
        <ClientHeader />
        <MenuInfoWidget />
        <CreateOrderDrawer />
      </VStack>
    </>
  );
}
