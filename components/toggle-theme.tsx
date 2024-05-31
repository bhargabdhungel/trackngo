"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSetRecoilState } from "recoil";

export default function ModeToggle(): JSX.Element {
  const { theme, setTheme } = useTheme();

  function changeTheme() {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <div className="w-full cursor-pointer flex" onClick={changeTheme}>
      {theme == "dark" ? (
        <Sun className="mr-2 h-4 w-4" />
      ) : (
        <Moon className="mr-2 h-4 w-4" />
      )}
      <span>{theme == "dark" ? "Light" : "Dark"} Mode</span>
    </div>
  );
}
