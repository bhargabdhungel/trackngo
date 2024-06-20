import { ContentLayout } from "@/components/admin-panel/content-layout";
import UploadDriver from "./UploadDriver";

export default function TripsPage() {
  return (
    <ContentLayout title="Vehicle Document Upload">
      <UploadDriver />
    </ContentLayout>
  );
}
