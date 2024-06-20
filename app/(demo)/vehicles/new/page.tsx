import { ContentLayout } from "@/components/admin-panel/content-layout";
import NewVehicle from "./NewVehicle";

export default function Page() {
  return (
    <ContentLayout title="Add New Vehicle">
      <NewVehicle />
    </ContentLayout>
  );
}
