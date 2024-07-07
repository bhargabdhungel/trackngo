"use client";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { DriverDocumentType } from "@prisma/client";
import Loading from "@/app/loading";
import { Input } from "@/components/ui/input";
import { Selector } from "@/components/selector";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { uploadDriverDocument } from "@/app/actions/doc/driver";
import getAllDrivers from "@/app/actions/driver/getAll";
import { readFileAsDataURL } from "@/app/(demo)/vehicles/[id]/upload/UploadVehicle";
import { Driver } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/DateInput/DatePicker";
import useData from "@/hooks/useData";

const driverDocOptions = Object.keys(DriverDocumentType).map((key) => ({
  value: key,
  label: key,
}));

function getDriverId(path: string) {
  const segments = path.split("/");
  const stringId = segments.length > 1 ? segments[segments.length - 2] : null;
  return stringId ? parseInt(stringId, 10) : null;
}

export default function UploadDriver() {
  const path = usePathname();
  const driverId = getDriverId(path);

  const [inputFile, setInputFile] = useState<File | null>(null);
  const [type, setType] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    data: drivers,
    isLoading,
    mutate,
  } = useData(getAllDrivers, "getAllDrivers");

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

  if (loading || isLoading) return <Loading />;

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
        driverId!,
        type as DriverDocumentType,
        expiryDate
      );

      const newDrivers: Driver[] = drivers!.map((driver: Driver) => {
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

      mutate({
        success: true,
        message: "File uploaded successfully",
        data: newDrivers,
      });

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
      router.replace(`/drivers/${driverId}`);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-112px)] flex justify-center items-center">
      <Card className="w-[350px] my-5">
        <CardHeader>
          <CardTitle>Upload a Document</CardTitle>
          <CardDescription>Upload your docs in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <DatePicker
                  date={expiryDate}
                  setDate={setExpiryDate}
                  placeholder="Select expiry date"
                />
              </div>

              <div className="flex flex-col space-y-1.5 text-sm text-muted-foreground">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Choose an image"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Selector
                  placeholder="Select a document"
                  label="Documents"
                  setSelected={setType}
                  options={driverDocOptions}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleUpload}>Upload</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
