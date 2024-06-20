import { ContentLayout } from "@/components/admin-panel/content-layout";
import NewTrip from "./NewTrip";

export default function Page() {
  return (
    <ContentLayout title="Add New Trip">
      <NewTrip />
    </ContentLayout>
  );
}
