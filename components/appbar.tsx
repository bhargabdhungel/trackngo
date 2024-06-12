import FilterInput from "./FilterInput";
import DropdownMenuDemo from "./dropdownForProfile";
import DownloadButton from "@/app/(client)/trip/Download";

export default function AppBar() {
  return (
    <div className="flex justify-between items-center h-16 px-4 py-2">
      <DropdownMenuDemo />
      <nav>
        <ul className="flex gap-4 items-center">
          <FilterInput />
          <DownloadButton />
        </ul>
      </nav>
    </div>
  );
}
