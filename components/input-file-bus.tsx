"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { BusDocumentType } from "@prisma/client";
import { Selector } from "./selector";
import { uploadVehicleDocument } from "@/app/actions/doc/vehicle";
import { useRecoilState } from "recoil";
import { vehiclesAtom } from "@/atoms/vehicle";
import useFetchData from "@/hooks/useFetchData";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import { Vehicle } from "@/lib/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

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

export function InputFile({ vehicleId }: { vehicleId: number }) {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [type, setType] = useState<string>("");
  const busId = vehicleId;
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [vehicles, setVehicles] = useRecoilState(vehiclesAtom);
  const shouldRun = vehicles ? false : true;
  useFetchData(shouldRun, setVehicles, getAllVehicles, setLoading);

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

    if (isNaN(busId)) {
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
        busId,
        type as BusDocumentType,
        expiryDate
      );

      const newVehicles: Vehicle[] = vehicles!.map((vehicle: Vehicle) => {
        if (vehicle.id === busId) {
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
      setVehicles(newVehicles);

      toast({
        title: res.success
          ? "File uploaded successfully"
          : "Error uploading file",
        description: res.message,
      });

      setLoading(false);

      router.replace(`/vehicle/${busId}/`);
    } catch (error) {
      toast({
        title: "Error uploading file",
        description: "Please try again later",
      });
      console.error(error);
    }
  };

  // iterate over the BusDocumentType enum and create an array of options
  const fruitOptions = Object.keys(BusDocumentType).map((key) => ({
    value: key,
    label: key,
  }));

  if (loading || !vehicles) return <div>Loading...</div>;

  return (
    <>
      <Card className="w-[350px] my-5">
        <CardHeader>
          <CardTitle>Upload a Document</CardTitle>
          <CardDescription>Upload your docs in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Select A Date</Label>
                <Input
                  type="date"
                  onChange={(e) => setExpiryDate(new Date(e.target.value))}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Choose an image</Label>
                <Input type="file" accept="image/*" onChange={handleFileChange} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Document Type</Label>
                <Selector
                  placeholder="Select a document"
                  label="Documents"
                  setSelected={setType}
                  options={fruitOptions}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleUpload}>Upload</Button>
        </CardFooter>
      </Card>
    </>
  );
}
