"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";
import { useEffect, useState } from "react";

export default function ModeToggle(): JSX.Element {
  const { setTheme } = useTheme();
  const theme = useTheme();
  const [isDark, setIsDark] = useState<boolean>(theme.theme === "dark");
  useEffect(() => {
    setIsDark(theme.theme === "dark");
  }, [theme.theme]);

  return (
    <Toggle>
      {isDark ? (
        <div
          onClick={() => {
            setTheme("light");
          }}
        >
          <Sun />
        </div>
      ) : (
        <div
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Moon />
        </div>
      )}
    </Toggle>
  );
}
