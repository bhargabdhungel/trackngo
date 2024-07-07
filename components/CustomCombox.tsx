import { ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface OptionType {
  value: string;
  label: string;
  icon?: JSX.Element;
}
export default function CustomCombobox({
  options,
  value,
  setValue,
  disabled,
}: {
  options: OptionType[];
  value: string | undefined;
  setValue: (val: string | undefined) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          role="combobox"
          size={"sm"}
          aria-expanded={open}
          className="w-full flex flex-row relative justify-start align-middle py-2 text-muted-foreground rounded space-x-1"
        >
          {value && options.find((option) => option.value === value)?.icon}
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select..."}
          <ChevronsUpDown className="absolute right-0 mr-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popper-anchor-width)] bg-background">
        <Command className="bg-background text-muted-foreground text-sm">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup className="text-muted-foreground">
              {options.map((option, index) => (
                <CommandItem
                  key={index}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.icon}
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
