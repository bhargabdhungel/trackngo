import DriverWithId from "@/app/(client)/driver/[id]/page";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function TripsPage() {
  return (
    <ContentLayout title="Driver Details">
      <DriverWithId />
    </ContentLayout>
  );
}
