import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { Button, HStack, Link } from '@chakra-ui/react';
import { APP_PATHS } from '@/shared/constants/AppPaths';

export const Header = (): JSX.Element => {
  const path = useLocation().pathname;

  return (
    <HStack backgroundColor={'primary'} p={'20px 0'} justifyContent={'center'}>
      <HStack minW={'800px'}>
        <Link as={ReactRouterLink} to={APP_PATHS.MAIN} color={'white'}>
          Main
        </Link>
      </HStack>
    </HStack>
  );
};
