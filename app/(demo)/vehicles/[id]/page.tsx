import TripAdd from "@/app/(client)/trip/add/page";
import VehicleWithId from "@/app/(client)/vehicle/[id]/page";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function TripsPage() {
  return (
    <ContentLayout title="Vehicle Details">
      <VehicleWithId />
    </ContentLayout>
  );
}
