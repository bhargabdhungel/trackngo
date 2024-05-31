"use client";
import { loadingAtom } from "@/atoms/loading";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSetRecoilState } from "recoil";

export default function ModeToggle(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const setLoading = useSetRecoilState(loadingAtom);

  function changeTheme() {
    if (theme == "dark") {
      setTheme("light");
      setLoading("black")
    } else {
      setTheme("dark");
      setLoading("white");
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
