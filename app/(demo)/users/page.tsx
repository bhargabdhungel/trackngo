import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function UsersPage() {
  return (
    <ContentLayout title="Users">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
          List of Users
        </h1>
      </div>
    </ContentLayout>
  );
}
