"use client";
import { chartAtom } from "@/atoms/chart";
import Chart from "@/components/Chart/Chart";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChartType } from "@/lib/types";
import {
  AreaChart,
  Car,
  LineChart,
  PieChart,
  Radar,
  Spline,
} from "lucide-react";
import { useSetRecoilState } from "recoil";

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <div className="w-full h-[calc(100vh-112px)]">
        <Chart />
      </div>
    </ContentLayout>
  );
}
