"use client";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { DriverDocumentType } from "@prisma/client";
import Loading from "./loading";
import { Input } from "./ui/input";
import { Selector } from "./selector";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { uploadDriverDocument } from "@/app/actions/doc/driver";
import { useRecoilState } from "recoil";
import { driversAtom } from "@/atoms/driver";
import useFetchData from "@/hooks/useFetchData";
import getAllDrivers from "@/app/actions/driver/getAll";
import { readFileAsDataURL } from "./input-file-bus";
import { Driver } from "@/lib/types";

const driverDocOptions = Object.keys(DriverDocumentType).map((key) => ({
  value: key,
  label: key,
}));

export default function InputDriverDoc({ driverId }: { driverId: number }) {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const router = useRouter();
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [drivers, setDrivers] = useRecoilState(driversAtom);
  const shouldRun = drivers ? false : true;

  useFetchData(shouldRun, setDrivers, getAllDrivers, setLoading);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setInputFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
      });
    }
  };

  if (loading || !drivers) return <Loading />;

  const handleUpload = async () => {
    if (!inputFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
      });
      return;
    }
    if (!type) {
      toast({
        title: "No document type selected",
        description: "Please select a document type",
      });
      return;
    }
    if (!expiryDate) {
      toast({
        title: "No expiry date selected",
        description: "Please select an expiry date",
      });
      return;
    }

    try {
      setLoading(true);
      const fileData = await readFileAsDataURL(inputFile);
      const res = await uploadDriverDocument(
        fileData,
        driverId,
        type as DriverDocumentType,
        expiryDate
      );

      const newDrivers: Driver[] = drivers.map((driver: Driver) => {
        if (driver.id === driverId) {
          return {
            ...driver,
            documents: driver.documents
              ? [...driver.documents, res.data!]
              : [res.data!],
          };
        } else {
          return driver;
        }
      });

      setDrivers(newDrivers);

      toast({
        title: res.success
          ? "File uploaded successfully"
          : "Error uploading file",
        description: res.message,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again later",
      });
      console.error("Error uploading document:", error);
    } finally {
      setLoading(false);
      router.push(`/driver/${driverId}`);
    }
  };

  return (
    <div className="flex flex-col items-center w-5/6 gap-8">
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Selector
        placeholder="Select a document"
        label="Documents"
        setSelected={setType}
        options={driverDocOptions}
      />
      <Input
        type="date"
        onChange={(e) => setExpiryDate(new Date(e.target.value))}
      />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}
