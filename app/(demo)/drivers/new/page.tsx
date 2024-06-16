import AddDriver from "@/app/(client)/driver/addnew/page";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function TripsPage() {
  return (
    <ContentLayout title="Add New Driver">
      <AddDriver />
    </ContentLayout>
  );
}
