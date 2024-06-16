import DriversPage from "@/app/(client)/driver/page";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function TripsPage() {
  return (
    <ContentLayout title="Drivers">
      <DriversPage />
    </ContentLayout>
  );
}
