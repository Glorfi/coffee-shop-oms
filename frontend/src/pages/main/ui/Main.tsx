import { BGClientComponent } from '@/shared/ui/BgComponents/BGClientComponent';
import { BGComponent } from '@/shared/ui/BgComponents/BgComponent';
import { ClientHeader } from '@/widgets/header';
import { MenuInfoWidget } from '@/widgets/menu';
// import { Header } from '@/widgets/header';
// import { BaseLayout } from '@/widgets/layouts';
// import { MenuInfoWidget } from '@/widgets/menu/ui/MenuInfoWidget';
import { Box, VStack, Text, HStack } from '@chakra-ui/react';

export function MainPage() {
  return (
    <>
      <BGComponent />
      {/* <BGClientComponent /> */}
      <VStack p={'10px'}>
        <ClientHeader />
        <MenuInfoWidget />
      </VStack>
    </>
  );
}
