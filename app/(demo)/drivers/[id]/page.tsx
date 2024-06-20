import { ContentLayout } from "@/components/admin-panel/content-layout";
import DriverWithId from "./DriverWithId";

export default function TripsPage() {
  return (
    <ContentLayout title="Driver Details">
      <DriverWithId />
    </ContentLayout>
  );
}
