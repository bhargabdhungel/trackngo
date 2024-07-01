import { ChartType, Trip, TripSummary } from "@/lib/types";
import { EChartsOption } from "echarts";
import summarizeTrips from "./preprocess";

function getPieChartOptions(summary: TripSummary): EChartsOption {
  return {
    tooltip: { trigger: "item" },
    series: [
      {
        name: "Trips",
        type: "pie",
        radius: ["0%", "50%"],
        label: { show: false, position: "center" },
        labelLine: { show: false },
        data: [
          { value: summary.totalBalance, name: "Profit" },
          { value: summary.totalMaintenanceCost, name: "Maintenance Cost" },
          { value: summary.totalFuelCost, name: "Fuel Cost" },
          { value: summary.totalOtherCost, name: "Other Cost" },
        ],
      },
    ],
  };
}

function getRadarChartOptions(
  summary: TripSummary,
  noOfTrips: number
): EChartsOption {
  return {
    tooltip: { trigger: "item" },
    radar: {
      indicator: [
        { name: "Maintenance Cost", max: summary.maxMaintenanceCost },
        { name: "Fuel Cost", max: summary.maxFuelCost },
        { name: "Profit", max: summary.maxBalance },
        { name: "Other Cost", max: summary.maxOtherCost },
      ],
    },
    series: [
      {
        name: "Trips average",
        type: "radar",
        data: [
          {
            value: [
              summary.totalMaintenanceCost / noOfTrips,
              summary.totalFuelCost / noOfTrips,
              summary.totalBalance / noOfTrips,
              summary.totalOtherCost / noOfTrips,
            ],
            name: "Trips average",
          },
        ],
      },
    ],
  };
}

function getLineChartOptions(
  trips: Trip[],
  smooth: boolean,
  areaStyle?: {}
): EChartsOption {
  return {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: trips.map((trip) => trip.startTime as string),
    },
    grid: { show: true },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        data: trips.map((trip) => trip.balance || 0),
        name: "Profit",
        type: "line",
        smooth,
        areaStyle,
      },
      {
        data: trips.map((trip) => trip.maintenanceCost || 0),
        name: "Maintenance Cost",
        type: "line",
        smooth,
        areaStyle,
      },
      {
        data: trips.map((trip) => trip.fuelCost || 0),
        name: "Fuel Cost",
        type: "line",
        smooth,
        areaStyle,
      },
      {
        data: trips.map((trip) => trip.otherCost || 0),
        name: "Other Cost",
        type: "line",
        smooth,
        areaStyle,
      },
    ],
  };
}

function getLineRaceChartOptions(trips: Trip[]): EChartsOption {
  const categories = ["Profit", "Maintenance Cost", "Fuel Cost", "Other Cost"];
  const seriesData: echarts.SeriesOption[] = categories.map((category) => ({
    name: category,
    type: "line",
    smooth: true,
    data: trips.map((trip) => {
      switch (category) {
        case "Profit":
          return trip.balance || 0;
        case "Maintenance Cost":
          return trip.maintenanceCost || 0;
        case "Fuel Cost":
          return trip.fuelCost || 0;
        case "Other Cost":
          return trip.otherCost || 0;
        default:
          return 0;
      }
    }),
  }));

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      show: true,
    },
    xAxis: {
      type: "category",
      data: trips.map((trip) => trip.startTime as string),
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { show: false },
    },
    series: seriesData,
    animationDuration: 5000,
  };
}

export default function getOptions(
  trips: Trip[],
  type: ChartType
): EChartsOption {
  const summary = summarizeTrips(trips);

  switch (type) {
    case ChartType.Pie:
      return getPieChartOptions(summary);
    case ChartType.Radar:
      return getRadarChartOptions(summary, trips.length);
    case ChartType.Smooth:
      return getLineChartOptions(trips, true);
    case ChartType.Area:
      return getLineChartOptions(trips, true, {});
    case ChartType.Discrete:
      return getLineChartOptions(trips, false);
    case ChartType.Race:
      return getLineRaceChartOptions(trips);
    default:
      throw getLineRaceChartOptions(trips);
  }
}
