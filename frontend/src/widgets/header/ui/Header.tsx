import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { Button, HStack, Link } from '@chakra-ui/react';
import { APP_PATHS } from '@/shared/constants/AppPaths';

export const AdminHeader = (): JSX.Element => {
  const path = useLocation().pathname;

  return (
    <HStack backgroundColor={'primary'} p={'20px 0'} justifyContent={'center'}>
      <HStack maxW={'800px'} w={'100%'}>
        <Link as={ReactRouterLink} to={APP_PATHS.MAIN} color={'white'}>
          Главная
        </Link>
        <Link as={ReactRouterLink} to={APP_PATHS.ADMIN} color={'white'}>
          Админка
        </Link>
        <Link as={ReactRouterLink} to={APP_PATHS.ADMIN_MENU} color={'white'}>
          Меню
        </Link>
        <Link as={ReactRouterLink} to={APP_PATHS.DASHBOARD} color={'white'}>
          Дашборд
        </Link>
      </HStack>
    </HStack>
  );
};
