"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function onClick() {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("light");
  }

  return (
    <Button variant="ghost" size="sm" onClick={onClick} className="my-2">
      <Sun className="h-5 w-5 scale-100 dark:scale-0" />
      <Moon className="h-5 w-5 absolute scale-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
