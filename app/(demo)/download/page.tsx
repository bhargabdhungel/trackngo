import FilterInput from "@/app/(demo)/download/FilterInput";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import DownloadButton from "./Download";

export default function Download() {
  return (
    <ContentLayout title="Download">
      <div className="flex flex-col gap-4 w-full p-4">
        <FilterInput />
        <DownloadButton />
      </div>
    </ContentLayout>
  );
}
