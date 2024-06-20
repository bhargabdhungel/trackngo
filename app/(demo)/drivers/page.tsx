import { ContentLayout } from "@/components/admin-panel/content-layout";
import DriversPage from "./Drivers";

export default function Page() {
  return (
    <ContentLayout title="Drivers">
      <DriversPage />
    </ContentLayout>
  );
}
