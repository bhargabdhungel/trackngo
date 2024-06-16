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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

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
    </>
  );
}
