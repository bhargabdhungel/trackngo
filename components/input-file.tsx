import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function InputFile() {
  const [inputFile, setInputFile] = useState<File | null>(null);
  console.log(inputFile);
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input
        id="document"
        type="file"
        onChange={(e) => setInputFile(e.target.files?.[0] as File)}
      />
    </div>
  );
}
