"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Loading from "@/app/loading";
import getAllDrivers from "@/app/actions/driver/getAll";
import Profile from "@/components/ui/Profile";
import useData from "@/hooks/useData";
import { DriverDocumentType } from "@prisma/client";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { driversAtom } from "@/atoms/driver";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import deleteDriver from "@/app/actions/driver/deleteDriver";
import { toast } from "@/components/ui/use-toast";

function DeleteDriverById({ id }: { id: number }) {
  const router = useRouter();
  const setDrivers = useSetRecoilState(driversAtom);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="border rounded-md hover:bg-white hover:bg-opacity-10"
        onClick={(event) => event.stopPropagation()}
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            driver, its documents and trips.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              try {
                const response = await deleteDriver(id);
                if (response.success) {
                  toast({
                    title: "Driver deleted successfully",
                  });
                  setDrivers((prevDrivers) =>
                    prevDrivers!.filter((driver) => driver.id !== id)
                  );
                  router.replace("/driver");
                } else {
                  toast({
                    title: response.message,
                  });
                  router.replace("/driver");
                }
              } catch (error) {
                toast({
                  title: "Server error",
                });
                router.replace("/driver");
              }
            }}
          >
            {" "}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
