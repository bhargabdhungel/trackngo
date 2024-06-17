"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import Loading from "@/app/loading";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { driverIdAtom, driverSelector, driversAtom } from "@/atoms/driver";
import { Button } from "@/components/ui/button";
import getAllDrivers from "@/app/actions/driver/getAll";
import ImageComponent from "next/image";
import { DocumentList } from "@/components/Document/Document";
import deleteDriver from "@/app/actions/driver/deleteDriver";
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
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import Profile from "@/components/ui/Profile";
import { HoverDocs } from "@/components/Document/HoverDocs";

function DeleteDriverById({ id }: { id: number }) {
  const router = useRouter();
  const setDrivers = useSetRecoilState(driversAtom);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="border py-2 px-4 rounded-md hover:bg-white hover:bg-opacity-10"
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
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [drivers, setDrivers] = useRecoilState(driversAtom);
  const [driverId, setDriverId] = useRecoilState(driverIdAtom);
  const [match, setMatch] = useState<boolean>(false);
  const driver = useRecoilValue(driverSelector);
  const shouldRun = drivers ? false : true;
  useFetchData(shouldRun, setDrivers, getAllDrivers, setLoading);

  useEffect(() => {
    if (id) {
      setDriverId(id);
    }
  }, [id, setDriverId]);

  useEffect(() => {
    if (drivers) {
      const isMatch = drivers.find((driver) => driver.id === id);
      if (!isMatch) router.back();
      else setMatch(true);
    }
  }, [drivers, id, router]);

  const image = driver?.documents?.find((doc) => doc.type === "IMAGE")?.link;

  if (loading || !match) return <Loading />;

  return (
    <>
      {/*

      <div className="mt-10">
        <p className="mx-20 sm:text-3xl text-2xl font-semibold mb-2">
          Documents
        </p>
        <hr className="border-t-2 border-gray-500 mx-20 mt-2 mb-10" />
        {driver?.documents && <DocumentList documents={driver.documents} />}
      </div> */}

      <div className="mt-5 flex justify-center">
        <Profile id={driver?.id!} image={image} name={driver?.name} contact={driver?.contact} />
      </div>

      <div className="flex items-center justify-center">
        {driver?.documents && <HoverDocs documents={driver.documents} />}
      </div>
    </>
  );
}
