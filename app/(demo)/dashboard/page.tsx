import { ContentLayout } from "@/components/admin-panel/content-layout";
import Trip from "../trips/Trips";
export default async function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col gap-4">this is dashboard</div>
    </ContentLayout>
  );
}
