import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import authCheck from "../actions/auth/authCheck";

export default async function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await authCheck();
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
