import { BGComponent } from '@/shared/ui/BgComponents/BgComponent';
import { AdminHeader } from '@/widgets/header';
import { MenuAdmindWidget, MenuInfoWidget } from '@/widgets/menu';

import { Box } from '@chakra-ui/react';

export const MenuStaticPage = (): JSX.Element => {
  const admin = window.localStorage.getItem('admin');
  return (
    <>
      {admin ? (
        <>
          <BGComponent />
          <AdminHeader />
          <MenuAdmindWidget />
        </>
      ) : (
        <>
          <BGComponent />
          <MenuInfoWidget />
        </>
      )}
    </>
  );
};
