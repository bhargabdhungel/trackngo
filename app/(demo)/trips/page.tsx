import GetTrips from "@/app/(client)/trip/Trip";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function TripsPage() {
  return (
    <ContentLayout title="Trips">
      <GetTrips />
    </ContentLayout>
  );
}
