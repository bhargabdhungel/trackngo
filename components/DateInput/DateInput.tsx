import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DatePicker } from "./DatePicker";
import { useState } from "react";

interface DateInputProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (newStartDate: Date) => void;
  onEndDateChange: (newEndDate: Date) => void;
}

export function DateInput({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateInputProps) {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="ml-1">
          Filter by Date
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>
            Please enter start date and end date.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 justify-center">
            <Label htmlFor="name" className="text-left">
              Start Time
            </Label>
            <DatePicker date={localStartDate} setDate={setLocalStartDate} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              End Time
            </Label>
            <DatePicker date={localEndDate} setDate={setLocalEndDate} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              className="w-full"
              onClick={() => {
                onStartDateChange(localStartDate);
                onEndDateChange(localEndDate);
              }}
            >
              Filter
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
