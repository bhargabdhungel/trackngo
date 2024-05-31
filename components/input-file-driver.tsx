import { useState } from "react";
import { toast } from "./ui/use-toast";
import { DriverDocumentType } from "@prisma/client";
import Loading from "./loading";
import { Input } from "./ui/input";
import { Selector } from "./selector";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

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

  if (loading) return <Loading />;

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
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Upload successful",
        description: "The document has been uploaded successfully",
      });
      router.push(`/driver/${driverId}`);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
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
