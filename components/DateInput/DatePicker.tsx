import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface DatePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  placeholder?: string;
}

export function DatePicker({ date, setDate, placeholder }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex gap-2 text-sm text-muted-foreground">
            <p className="text-left font-light">
              {date ? `${format(date, "PPP")}` : placeholder}
            </p>
            <CalendarIcon className="mr-2 h-4 w-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ?? new Date()}
          onSelect={(date) => {
            if (date) {
              setDate(date);
              setIsOpen(false);
            }
          }}
          // initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
