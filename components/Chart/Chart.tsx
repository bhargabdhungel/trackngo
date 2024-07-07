"use client";
import Echart from "./Echarts";
import getOptions from "./getOptions";
import useData from "@/hooks/useData";
import getAllTrips from "@/app/actions/trip/getAll";
import Loading from "@/app/loading";
import { useMemo } from "react";
import updateTrips from "@/lib/updateTrips";
import { useRecoilState, useRecoilValue } from "recoil";
import { endDateAtom, startDateAtom } from "@/atoms/trip";
import { chartAtom } from "@/atoms/chart";
import { ChartType } from "@/lib/types";
import CustomCombobox, { OptionType } from "../CustomCombox";
import {
  AreaChart,
  Car,
  LineChart,
  PieChart,
  Radar,
  Spline,
} from "lucide-react";
export default function Chart() {
  const [chartType, setChartType] = useRecoilState(chartAtom);
  const startDate = useRecoilValue(startDateAtom);
  const endDate = useRecoilValue(endDateAtom);
  const { data, isLoading } = useData(getAllTrips, "getAllTrips", {
    startDate,
    endDate,
  });

  const trips = useMemo(() => {
    if (!data) return [];
    else return updateTrips(data);
  }, [data]);

  const options = useMemo(
    () => getOptions(trips, chartType),
    [trips, chartType]
  );

  if (isLoading || !data) return <Loading />;
  if (trips.length === 0)
    return (
      <div className="w-full h-full">
        <h1 className="text-center text-2xl font-bold text-gray-500">
          No trips found
        </h1>
      </div>
    );
  if (trips.length < 5) {
    return (
      <div className="w-full h-[calc(100vh-112px)] flex justify-center items-center">
        <h1 className="text-center text-4xl font-bold text-muted-foreground">
          Please add atleast 5 trips to see the stats
        </h1>
      </div>
    );
  }

  const chartTypeOptions: OptionType[] = [
    {
      value: ChartType.Race,
      label: "Race",
      icon: <Car className="mr-2 h-4 w-4" />,
    },
    {
      value: ChartType.Pie,
      label: "Pie",
      icon: <PieChart className="mr-2 h-4 w-4" />,
    },
    {
      value: ChartType.Smooth,
      label: "Smooth",
      icon: <Spline className="mr-2 h-4 w-4" />,
    },
    {
      value: ChartType.Radar,
      label: "Radar",
      icon: <Radar className="mr-2 h-4 w-4" />,
    },
    {
      value: ChartType.Area,
      label: "Area",
      icon: <AreaChart className="mr-2 h-4 w-4" />,
    },
    {
      value: ChartType.Discrete,
      label: "Discrete",
      icon: <LineChart className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="w-full flex flex-col h-[calc(100vh-112px)] items-start justify-center">
      <div className="w-full">
        <CustomCombobox
          options={chartTypeOptions}
          value={chartType}
          setValue={(value) => {
            if (value) setChartType(value as ChartType);
          }}
        />
      </div>
      <Echart className="w-full h-full grow-0" echartOptions={options} />
    </div>
  );
}
