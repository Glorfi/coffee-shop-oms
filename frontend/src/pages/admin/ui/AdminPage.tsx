import { Box, VStack, Text, HStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { APP_PATHS } from '@/shared/constants/AppPaths';
import { AdminHeader } from '@/widgets/header';
import { BGComponent } from '@/shared/ui/BgComponents/BgComponent';

export const AdminPage = (): JSX.Element => {
  return (
    <>
      <BGComponent />
      <AdminHeader />
      <VStack
        m={'0 auto'}
        p={'20px 0'}
        maxW={'800px'}
        alignItems={'flex-start'}
      >
        <Text>
          Это страница вашей админки где можно управлять меню и заказами на
          соотвествующих страницах
        </Text>

        <Text>
          <ChakraLink
            as={ReactRouterLink}
            to={APP_PATHS.MAIN}
            fontWeight={'semibold'}
            color={'teal'}
          >
            Главная страница
          </ChakraLink>
          - главная страница вашего сайта где клиенты могу сделать заказ онлайн
        </Text>

        <Text>
          <ChakraLink
            as={ReactRouterLink}
            to={APP_PATHS.MENU_STATIC}
            fontWeight={'semibold'}
            color={'teal'}
          >
            Статичное меню
          </ChakraLink>
          - страница c статичным меню, содержит ваши напитки и цены, можно
          показывать на отдельном экране или сделать QR-код на эту страницу, для
          клиентов которые заказывают у кофейни
        </Text>
        <Text>
          <ChakraLink
            as={ReactRouterLink}
            to={APP_PATHS.DASHBOARD}
            fontWeight={'semibold'}
            color={'teal'}
          >
            Дашборд
          </ChakraLink>
          - страница где можно управлять меню: добавлять, удалять и
          редактировать напитки
        </Text>
      </VStack>
    </>
  );
};
