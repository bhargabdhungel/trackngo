"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import deleteDriver from "@/app/actions/driver/deleteDriver";
import { useRouter } from "next/navigation";
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
import useData from "@/hooks/useData";
import getAllDrivers from "@/app/actions/driver/getAll";
import { DriverDocument } from "@/lib/types";
import { HoverDocs } from "../Document/HoverDocs";

interface ProfileProps {
  id: number;
  image?: string;
  name?: string;
  contact?: string;
  documents?: DriverDocument[];
}

function DeleteDriverById({ id }: { id: number }) {
  const router = useRouter();
  const {
    data: drivers,
    isLoading,
    mutate,
  } = useData(getAllDrivers, "getAllDrivers");
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="border py-2 px-4 rounded-md hover:bg-white hover:bg-opacity-10 "
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
                  mutate({
                    success: true,
                    message: "Driver deleted successfully",
                    data: drivers?.filter((driver) => driver.id !== id),
                  });
                } else {
                  toast({
                    title: response.message,
                  });
                }
              } catch (error) {
                toast({
                  title: "Server error",
                });
              } finally {
                router.replace("/drivers");
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

export default function Profile({ id, image, name, contact, documents }: ProfileProps) {
  const noimage =
    "https://imgs.search.brave.com/xynPF2RX8yrKnvYLoAEpP8H4sadW2BamRD5N6uGqGcg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzU5LzU4Lzkx/LzM2MF9GXzM1OTU4/OTE4Nl9KRExsOGRJ/V29CTmYxaXFFa0h4/aFVlZU91bHgwd09D/NS5qcGc";
  const router = useRouter();
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  )

  return (
    <>
      <Card className="w-4/5 flex flex-col lg:flex-row">
        <CardContent className="w-full lg:w-1/2">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 items-center sm:justify-center">
              <Avatar className="sm:h-40 sm:w-40 h-40 w-40 border-1 mt-4">
                <AvatarImage
                  src={image ? image : noimage}
                  alt="Profile Image"
                  className="object-cover"
                />
              </Avatar>
              <div className="flex flex-col sm:ml-0 ml-3">
                <p className="sm:text-2xl text-md sm:text-center my-1">{name}</p>
                <p className="text-gray-500 sm:text-center my-1">{contact}</p>
                <div className="flex flex-col">
                  <DeleteDriverById id={id} />
                  <Button
                    className="my-2"
                    onClick={() => {
                      router.push(`/drivers/${id}/upload`);
                    }}
                  >
                    <p className="py-1">Upload</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardContent className="w-full lg:w-1/2">
          <div className="p-4">
            {documents && <HoverDocs docs={documents} />}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
