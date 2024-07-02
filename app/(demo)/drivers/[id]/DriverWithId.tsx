"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Loading from "@/app/loading";
import getAllDrivers from "@/app/actions/driver/getAll";
import Profile from "@/components/ui/Profile";
import useData from "@/hooks/useData";
import { DriverDocumentType } from "@prisma/client";

export default function DriverWithId() {
  const path = usePathname();
  const id = parseInt(path.split("/").pop() as string, 10);

  const { data: drivers, isLoading } = useData(getAllDrivers, "getAllDrivers");
  const driver = useMemo(
    () => drivers?.find((driver) => driver.id === id),
    [drivers, id]
  );

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-[calc(100vh-112px)]">
      <div className="mt-5 flex justify-center">
        <Profile
          id={driver?.id!}
          image={
            driver?.documents?.find(
              (document) => document.type === DriverDocumentType.IMAGE
            )?.link
          }
          name={driver?.name}
          contact={driver?.contact}
          documents={driver?.documents}
        />
      </div>
    </div>
  );
}
