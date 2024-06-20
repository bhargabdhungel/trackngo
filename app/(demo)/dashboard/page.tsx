import Chart from "@/components/Chart/Chart";
import { ContentLayout } from "@/components/admin-panel/content-layout";
export default async function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <Chart />
    </ContentLayout>
  );
}
