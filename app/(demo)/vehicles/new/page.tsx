import AddVehicle from "@/app/(client)/vehicle/addnew/page";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function VehileAddPage() {
  return (
    <ContentLayout title="Add New Vehicle">
      <AddVehicle />
    </ContentLayout>
  );
}
