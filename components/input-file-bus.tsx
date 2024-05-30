"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { BusDocumentType } from "@prisma/client";
import { Selector } from "./selector";
import { uploadFile } from "@/app/actions/doc/vehicle";

function readFileAsDataURL(file: File): Promise<string> {
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
      const res = await uploadFile(
        fileData,
        busId,
        type as BusDocumentType,
        expiryDate
      );

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 w-5/6">
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Selector
        placeholder="Select a document"
        label="Documents"
        setSelected={setType}
        options={fruitOptions}
      />
      <Input
        type="date"
        onChange={(e) => setExpiryDate(new Date(e.target.value))}
      />
      <Button className="mt-12" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}
