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
import { SelectorProps } from "@/lib/types";

export function Selector({
  placeholder,
  label,
  options,
  setSelected,
}: SelectorProps) {
  return (
    <Select onValueChange={setSelected}>
      <SelectTrigger className="w-2/3">
        <SelectValue placeholder={placeholder} className="w-full" />
      </SelectTrigger>
      <SelectContent className="w-full">
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
