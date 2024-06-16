import TripAdd from "@/app/(client)/trip/add/page";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function TripsPage() {
  return (
    <ContentLayout title="Add New Trip">
      <TripAdd />
    </ContentLayout>
  );
}
