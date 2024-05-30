"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import useFetchData from "@/hooks/useFetchData";
import Loading from "@/components/loading";
import { useRecoilState } from "recoil";
import { driversAtom } from "@/atoms/driver";
import { Button } from "@/components/ui/button";
import getAllDrivers from "@/app/actions/driver/getAll";

export default function DriverWithId() {
  const path = usePathname();
  const id = parseInt(path.split("/").pop() as string, 10);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [drivers, setDrivers] = useRecoilState(driversAtom);
  const shouldRun = drivers ? false : true;
  useFetchData(shouldRun, setDrivers, getAllDrivers, setLoading);

  const driver = drivers?.find(
    (driver) => driver.id === id && driver.documents
  );
  if (loading) return <Loading />;

  return (
    <div className="h-full flex flex-col pt-12 items-center">
      <h2 className="scroll-m-20 border-b pb-12 text-3xl font-semibold tracking-tight first:mt-0">
        {driver?.name}
      </h2>
      <h3 className="text-xl font-semibold tracking-tight">Documents</h3>
      <div className="flex flex-col items-center">
        {driver?.documents?.map((document) => (
          <div key={document.id} className="flex items-center">
            <p className="text-lg font-semibold tracking-tight">
              {document.type}
            </p>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          router.push(`/driver/${id}/upload`);
        }}
      >
        Upload Document
      </Button>
    </div>
  );
}
