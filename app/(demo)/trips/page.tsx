import { ContentLayout } from "@/components/admin-panel/content-layout";
import TripsPage from "./Trips";

export default function Page() {
  return (
    <ContentLayout title="Trips">
      <TripsPage />
    </ContentLayout>
  );
}
