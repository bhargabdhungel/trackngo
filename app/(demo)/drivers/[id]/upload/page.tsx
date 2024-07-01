import { ContentLayout } from "@/components/admin-panel/content-layout";
import UploadDriver from "./UploadDriver";

export default function TripsPage() {
  return (
    <ContentLayout title="Vehicle Document Upload">
      <div className="items-center justify-center flex top-5">
        <UploadDriver />
      </div>
    </ContentLayout>
  );
}
