"use client";

import Chart from "@/components/Chart/Chart";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function ChartPage() {
  return (
    <div className="h-1/2 w-5/6">
      <Chart />;
    </div>
  );
}
