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

type DataPoint = {
  name: string;
  uv: number;
};

export default function Chart() {
  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args: any[]) => {
      if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
        return;
      }

      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  const data = [
    { name: "21 Jan", x: 1, goal: 1000 },
    { name: "22 Jan", x: 2, goal: 300 },
    { name: "23 Jan", x: 3, goal: 200 },
    { name: "24 Jan", x: 4, goal: 300 },
    { name: "25 Jan", x: 5, goal: 200 },
    { name: "26 Jan", x: 6, goal: 278 },
    { name: "27 Jan", x: 7, goal: 189 },
    { name: "28 Jan", x: 8, goal: 239 },
    { name: "29 Jan", x: 9, goal: 349 },
    { name: "30 Jan", x: 10, goal: 278 },
    { name: "31 Jan", x: 11, goal: 189 },
    { name: "1 Feb", x: 12, goal: 239 },
    { name: "2 Feb", x: 13, goal: 349 },
    { name: "3 Feb", x: 14, goal: 278 },
    { name: "4 Feb", x: 15, goal: 189 },
    { name: "5 Feb", x: 16, goal: 239 },
    { name: "6 Feb", x: 17, goal: 349 },
    { name: "7 Feb", x: 18, goal: 278 },
    { name: "8 Feb", x: 19, goal: 189 },
    { name: "9 Feb", x: 20, goal: 239 },
    { name: "10 Feb", x: 21, goal: 349 },
    { name: "11 Feb", x: 22, goal: 278 },
    { name: "12 Feb", x: 23, goal: 189 },
    { name: "13 Feb", x: 24, goal: 239 },
    { name: "14 Feb", x: 25, goal: 349 },
    { name: "15 Feb", x: 26, goal: 278 },
    { name: "16 Feb", x: 27, goal: 189 },
    { name: "17 Feb", x: 28, goal: 239 },
    { name: "18 Feb", x: 29, goal: 349 },
    { name: "19 Feb", x: 30, goal: 278 },
    { name: "20 Feb", x: 31, goal: 189 },
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar
            dataKey="goal"
            fill="hsl(var(--foreground))"
            opacity={0.9}
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Rectangle
                key={`bar-${index}`}
                y={entry.goal}
                width={20}
                height={entry.goal}
                fill="hsl(var(--foreground))"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
