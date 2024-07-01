"use client";
import React, { useRef, useEffect } from "react";
import { ECharts, EChartsOption, init } from "echarts";

const Echart = ({
  echartOptions,
  className,
  onDataPointClick,
}: {
  echartOptions: EChartsOption;
  className?: string;
  onDataPointClick?: (params: any) => void;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ECharts>();

  useEffect(() => {
    if (!divRef.current) return;
    chartRef.current = init(divRef.current);
    return () => {
      chartRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current && echartOptions) {
      chartRef.current.setOption(echartOptions, true);

      if (onDataPointClick) {
        chartRef.current.off("click");
        chartRef.current.on("click", onDataPointClick);
      }
    }
  }, [echartOptions, onDataPointClick]);

  return <div ref={divRef} className={className} />;
};

export default Echart;
