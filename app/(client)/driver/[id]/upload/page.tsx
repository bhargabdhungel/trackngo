"use client";
import InputDriverDoc from "@/components/input-file-driver";
import { BusDocumentType } from "@prisma/client";
import { Value } from "@radix-ui/react-select";
import { usePathname } from "next/navigation";

function getDriverId(path: string) {
  const segments = path.split("/");
  const stringId = segments.length > 1 ? segments[segments.length - 2] : null;
  return stringId ? parseInt(stringId, 10) : null;
}

export default function UploadDriverDoc() {
  const path = usePathname();
  const id = getDriverId(path);

  return (
    <div className="h-full flex flex-col pt-12 items-center">
      <InputDriverDoc driverId={id as number} />
    </div>
  );
}
