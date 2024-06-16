import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Profile from "@/app/(client)/profile/page";

export default function AccountPage() {
  return (
    <ContentLayout title="Account">
      <Profile />
    </ContentLayout>
  );
}
