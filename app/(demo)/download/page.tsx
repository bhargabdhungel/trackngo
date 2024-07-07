import FilterInput from "@/app/(demo)/download/FilterInput";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import DownloadButton from "./Download";

export default function Download() {
  return (
    <ContentLayout title="Download">
      <div className="flex justify-center items-center h-[calc(100vh-112px)]">
        <DownloadButton />
      </div>
    </ContentLayout>
  );
}
