import { AdminHeader } from '@/widgets/header';
import { MenuAdmindWidget, MenuInfoWidget } from '@/widgets/menu';

import { Box } from '@chakra-ui/react';

export const MenuStaticPage = (): JSX.Element => {
  const admin = window.localStorage.getItem('admin');
  return (
    <>
      {admin ? (
        <>
          <AdminHeader />
          <MenuAdmindWidget />
        </>
      ) : (
        <MenuInfoWidget />
      )}
    </>
  );
};
