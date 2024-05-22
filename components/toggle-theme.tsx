"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";

export default function ModeToggle(): JSX.Element {
  const { setTheme } = useTheme();
  const currentTheme = useTheme().theme;
  const isDark = currentTheme === "dark";
  return (
    <Toggle>
      {isDark ? (
        <Sun onClick={() => setTheme("light")} />
      ) : (
        <Moon onClick={() => setTheme("dark")} />
      )}
    </Toggle>
  );
}
