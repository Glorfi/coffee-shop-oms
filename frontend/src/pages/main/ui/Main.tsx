import { BGClientComponent } from '@/shared/ui/BgComponents/BGClientComponent';
import { ClientHeader } from '@/widgets/header';
// import { Header } from '@/widgets/header';
// import { BaseLayout } from '@/widgets/layouts';
// import { MenuInfoWidget } from '@/widgets/menu/ui/MenuInfoWidget';
import { Box, VStack, Text } from '@chakra-ui/react';

export function MainPage() {
  return (
    <>
      <BGClientComponent />
      <VStack p={'10px'}>
        <ClientHeader />
        <Text>Главная страница</Text>
      </VStack>
    </>
  );
}
