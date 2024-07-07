"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { BusDocumentType } from "@prisma/client";
import { Selector } from "@/components/selector";
import { uploadVehicleDocument } from "@/app/actions/doc/vehicle";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import { Vehicle } from "@/lib/types";

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
import Loading from "@/app/loading";

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => {
      toast({
        title: "Error reading file",
        description: "Please try again later",
      });
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

function getVehicleId(path: string) {
  const segments = path.split("/");
  const stringId = segments.length > 1 ? segments[segments.length - 2] : null;
  return stringId ? parseInt(stringId, 10) : null;
}

export default function UploadVehicle() {
  const router = useRouter();
  const path = usePathname();
  const vehicleId = getVehicleId(path) as number;

  const [inputFile, setInputFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  const {
    data: vehicles,
    isLoading,
    mutate,
  } = useData(getAllVehicles, "getAllVehicles");

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

    if (isNaN(vehicleId)) {
      toast({
        title: "Invalid bus ID",
        description: "Please refresh go back and try again",
      });
      return;
    }

    try {
      setLoading(true);
      const fileData = await readFileAsDataURL(inputFile);
      const res = await uploadVehicleDocument(
        fileData,
        vehicleId,
        type as BusDocumentType,
        expiryDate
      );

      toast({
        title: res.success
          ? "File uploaded successfully"
          : "Error uploading file",
        description: res.message,
      });

      if (res.success) {
        const newVehicles: Vehicle[] = vehicles!.map((vehicle: Vehicle) => {
          if (vehicle.id === vehicleId) {
            return {
              ...vehicle,
              documents: vehicle.documents
                ? [...vehicle.documents, res.data!]
                : [res.data!],
            };
          } else {
            return vehicle;
          }
        });
        mutate({
          success: true,
          message: "File uploaded successfully",
          data: newVehicles,
        });
      }

      toast({
        title: res.success
          ? "File uploaded successfully"
          : "Error uploading file",
        description: res.message,
      });

      setLoading(false);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error uploading file",
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
      setInputFile(null);
      setType("");
      setExpiryDate(null);
      router.replace(`/vehicles/${vehicleId}`);
    }
  };

  const vehicleOptions = Object.keys(BusDocumentType).map((key) => ({
    value: key,
    label: key,
  }));

  if (loading || isLoading) return <Loading />;

  return (
    <div className="w-full h-[calc(100vh-112px)] flex items-center justify-center mt-10">
      <Card className="w-[350px] my-5">
        <CardHeader>
          <CardTitle>Upload a Document</CardTitle>
          <CardDescription>Upload your docs in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
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
                className=""
                onChange={handleFileChange}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Selector
                placeholder="Select a document"
                label="Documents"
                setSelected={setType}
                options={vehicleOptions}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleUpload}>Upload</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
