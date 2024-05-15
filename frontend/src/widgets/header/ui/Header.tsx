import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { Box, Button, HStack, Link } from '@chakra-ui/react';
import { APP_PATHS } from '@/shared/constants/AppPaths';
import { LanguageSwitcher } from '@/shared/ui/languageSwitcher/LanguageSwitcher';
import { useEffect } from 'react';

export const AdminHeader = (): JSX.Element => {
  const path = useLocation().pathname;

  interface ILink {
    to: string;
    title: string;
  }

  const linkList: ILink[] = [
    { to: APP_PATHS.MAIN, title: 'Главная' },
    { to: APP_PATHS.ADMIN, title: 'Админка' },
    { to: APP_PATHS.ADMIN_MENU, title: 'Меню' },
    { to: APP_PATHS.DASHBOARD, title: 'Заказы' },
  ];

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <HStack
      backgroundColor={'whiteAlpha.600'}
      p={'20px 10px'}
      backdropFilter={'blur(2px)'}
      justifyContent={'center'}
      width={"100%"}
      position={"relative"}
      zIndex={5}
    >
      <HStack w={'100%'} maxW={'1200px'} m={'0 auto'}>
        {linkList.map((link, index) => (
          <Link
            as={ReactRouterLink}
            to={link.to}
            color={'primary'}
            fontWeight={path === link.to ? 'bold' : 'semibold'}
           // padding={'5px'}
            key={`link${index}`}
          >
            {link.title}
          </Link>
        ))}
        <Box ml={'auto'}>
          <LanguageSwitcher />
        </Box>
      </HStack>
    </HStack>
  );
};
