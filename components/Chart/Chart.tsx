"use client";
import Echart from "./Echarts";
import getOptions from "./getOptions";
import useData from "@/hooks/useData";
import getAllTrips from "@/app/actions/trip/getAll";
import Loading from "@/app/loading";
import { useMemo } from "react";
import updateTrips from "@/lib/updateTrips";
import { useRecoilValue } from "recoil";
import { chartAtom } from "@/atoms/chart";
import { endDateAtom, startDateAtom } from "@/atoms/trip";
export default function Chart() {
  const chartType = useRecoilValue(chartAtom);
  const startDate = useRecoilValue(startDateAtom);
  const endDate = useRecoilValue(endDateAtom);
  const { data, isLoading } = useData(getAllTrips, "getAllTrips", {
    startDate,
    endDate,
  });

  const trips = useMemo(() => {
    console.log(data);
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
      <div className="w-full h-full">
        <h1 className="text-center text-2xl font-bold text-gray-500">
          Please add atleast 5 trips to see the stats
        </h1>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-112px)] items-center justify-center">
      <Echart className="w-full h-full" echartOptions={options} />
    </div>
  );
}
