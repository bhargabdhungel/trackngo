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
  const setChartType = useSetRecoilState(chartAtom);
  return (
    <ContentLayout title="Dashboard">
      <div className="w-full h-[calc(100vh-112px)] flex">
        <div className="grow p-2">
          <Chart />
        </div>
        <ToggleGroup
          type="single"
          onValueChange={(value) => {
            if (value) setChartType(value as ChartType);
          }}
          className="flex flex-col items-start justify-start w-36"
        >
          <ToggleGroupItem
            value={ChartType.Smooth}
            aria-label="Toggle smooth"
            className="w-full flex justify-start"
          >
            <Spline className="mr-2 h-4 w-4" />
            Smooth
          </ToggleGroupItem>
          <ToggleGroupItem
            value={ChartType.Area}
            className="w-full flex justify-start"
            aria-label="Toggle area"
          >
            <AreaChart className="mr-2 h-4 w-4" />
            Area
          </ToggleGroupItem>
          <ToggleGroupItem
            value={ChartType.Discrete}
            aria-label="Toggle discrete"
            className="w-full flex justify-start"
          >
            <LineChart className="mr-2 h-4 w-4" />
            Discrete
          </ToggleGroupItem>
          <ToggleGroupItem
            value={ChartType.Pie}
            aria-label="Toggle pie"
            className="w-full flex justify-start"
          >
            <PieChart className="mr-2 h-4 w-4" />
            Pie
          </ToggleGroupItem>
          <ToggleGroupItem
            value={ChartType.Radar}
            aria-label="Toggle radar"
            className="w-full flex justify-start"
          >
            <Radar className="mr-2 h-4 w-4" />
            Radar
          </ToggleGroupItem>
          <ToggleGroupItem
            value={ChartType.Race}
            aria-label="Toggle race"
            className="w-full flex justify-start"
          >
            <Car className="mr-2 h-4 w-4" />
            Race
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </ContentLayout>
  );
}
