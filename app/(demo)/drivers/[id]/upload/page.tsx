import UploadDriverDoc from "@/app/(client)/driver/[id]/upload/page";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function TripsPage() {
  return (
    <ContentLayout title="Vehicle Document Upload">
      <UploadDriverDoc />
    </ContentLayout>
  );
}
