import ButtonSignOut from "./buttons/SignOut";
import ModeToggle from "./toggle-theme";
import Profile from "./profile";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";

import CommandDemo from "./command";
import DropdownMenuDemo from "./dropdownForProfile";

export default function AppBar() {
  return (
    <div className="flex justify-between items-center h-16 px-4">
      <div>
        <DropdownMenuDemo />
      </div>
      <nav>
        <ul className="flex gap-4 items-center"></ul>
      </nav>
    </div>
  );
}
