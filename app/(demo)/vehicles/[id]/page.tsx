import { ContentLayout } from "@/components/admin-panel/content-layout";
import VehicleWithId from "./VehicleWithId";

export default function TripsPage() {
  return (
    <ContentLayout title="Vehicle Details">
      <VehicleWithId />
    </ContentLayout>
  );
}
