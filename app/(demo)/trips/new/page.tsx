import { ContentLayout } from "@/components/admin-panel/content-layout";
import InputTrip from "@/components/input-file-trip";

export default function TripsPage() {
  return (
    <ContentLayout title="Add New Trip">
      <InputTrip />
    </ContentLayout>
  );
}
