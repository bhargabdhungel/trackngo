"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import useFetchData from "@/hooks/useFetchData";
import Loading from "@/components/loading";
import { useRecoilState } from "recoil";
import { driversAtom } from "@/atoms/driver";
import { Button } from "@/components/ui/button";
import getAllDrivers from "@/app/actions/driver/getAll";
import ImageComponent from "next/image";
import { DocumentList } from "@/components/Document/Document";

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

  const image = driver?.documents?.find(doc => doc.type === "IMAGE")?.link;

  if (loading) return <Loading />;

  return (
    <>
      <p className="text-center sm:text-4xl text-xl font-semibold mt-10 mx-20">Details</p>

      <hr className="border-t-2 border-gray-300 mx-20 mt-1" />

      <div className="md:flex md:flex-row flex flex-col items-center justify-center mx-4 md:mx-20 sm:mt-16 space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex flex-col w-full md:w-1/2 p-4 md:p-10">
          <div className="mb-8">
            <p className="sm:text-2xl text-xl font-semibold mb-2">Name</p>
            <hr className="border-t-2 border-gray-300" />
            <p className="mt-2 text-lg text-gray-400 hover:underline">{driver?.name}</p>
          </div>

          <div>
            <p className="sm:text-2xl text-xl font-semibold mb-2">Contact No.</p>
            <hr className="border-t-2 border-gray-300" />
            <p className="mt-2 text-lg text-gray-400 hover:underline">{driver?.contact}</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-10">
          {image ? (
            <div
              onClick={() => { router.push(image) }}
              className="cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:shadow-md hover:shadow-white"
            >
              <ImageComponent
                src={image}
                alt="Driver Image"
                width={300}
                height={300}
                className="object-contain rounded-lg shadow-lg"
              />
              <hr />
              <p className="text-center mt-2 text-xl hover:underline">Image</p>
            </div>
          ) : (
            <div className="w-64 h-64 flex items-center justify-center border rounded-lg shadow-lg bg-gray-100">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <p className="mx-20 sm:text-3xl text-2xl font-semibold mb-2">Documents</p>
        <hr className="border-t-2 border-gray-500 mx-20 mt-2 mb-10" />
        {driver?.documents && <DocumentList documents={driver.documents} />}
      </div>

      {/* ----------------------- */}

      <div className="h-full flex flex-col pt-12 items-center mt-10">
        <Button
          onClick={() => {
            router.push(`/driver/${id}/upload`);
          }}
        >
          Upload Document
        </Button>
      </div>
    </>
  );
}
