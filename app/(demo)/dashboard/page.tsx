import { ContentLayout } from "@/components/admin-panel/content-layout";
import GetTrips from "@/app/(client)/trip/Trip";
import authCheck from "@/app/actions/auth/authCheck";

export default async function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <GetTrips />
    </ContentLayout>
  );
}
