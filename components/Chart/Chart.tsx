"use client";

import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { LineChart, Line } from "recharts";

interface DataPoint {
  name: string;
  others: number;
  pv: number;
  fare: number;
}

const data: DataPoint[] = [
  { name: "1st Week", others: 400, pv: 2400, fare: 1200 },
  { name: "2nd Week", others: 300, pv: 1398, fare: 2210 },
  { name: "3rd Week", others: 200, pv: 9800, fare: 2290 },
  { name: "4th Week", others: 278, pv: 3908, fare: 2000 },
  { name: "5th Week", others: 189, pv: 4800, fare: 2181 },
  { name: "6th Week", others: 239, pv: 3800, fare: 2500 },
  { name: "7th Week", others: 349, pv: 4300, fare: 2100 },
];

export default function Chart() {
  return (
    <div className="flex h-[calc(100vh-112px)] items-center justify-center">
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="fare" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name " />
        {/* <XAxis dataKey="fare" /> */}
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
