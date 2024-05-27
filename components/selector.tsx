import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Extend the props interface to include setSelected
interface SelectorProps {
  placeholder: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  setSelected: (value: string) => void; // Function to update the selected value
}

export function Selector({
  placeholder,
  label,
  options,
  setSelected,
}: SelectorProps) {
  return (
    <Select onValueChange={setSelected}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
