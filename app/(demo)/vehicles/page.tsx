import { ContentLayout } from "@/components/admin-panel/content-layout";
import VehilesPage from "./Vehicles";

export default function Page() {
  return (
    <ContentLayout title="Vehicles">
      <VehilesPage />
    </ContentLayout>
  );
}
