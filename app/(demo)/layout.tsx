import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import authCheck from "@/app/actions/auth/authCheck";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await authCheck();
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
