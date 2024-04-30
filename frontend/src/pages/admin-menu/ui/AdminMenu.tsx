import { BGComponent } from "@/shared/ui/BgComponents/BgComponent";
import { AdminHeader } from "@/widgets/header";
import { MenuAdmindWidget } from "@/widgets/menu";

export const AdminMenuPage = (): JSX.Element => {
  return (
    <>
      <BGComponent />
      <AdminHeader />
      <MenuAdmindWidget />
    </>
  );
};
