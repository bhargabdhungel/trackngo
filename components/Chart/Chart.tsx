"use client"

import React, { useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
        { name: 'Page A', x: 1, goal: 1000 },
        { name: 'Page B', x: 2, goal: 300 },
        { name: 'Page C', x: 3, goal: 200 },
        { name: 'Page D', x: 4, goal: 300 },
        { name: 'Page E', x: 5, goal: 200 },
        { name: 'Page F', x: 6, goal: 278 },
        { name: 'Page G', x: 7, goal: 189 },
        { name: 'Page H', x: 8, goal: 239 },
        { name: 'Page I', x: 9, goal: 300 },
        { name: 'Page J', x: 10, goal: 200 },
        { name: 'Page K', x: 11, goal: 278 },
        { name: 'Page L', x: 12, goal: 189 },
        { name: 'Page M', x: 13, goal: 349 },
    ];

    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Legend />
                    <Bar dataKey="goal" fill="hsl(var(--foreground))" opacity={0.9} radius={[10, 10, 0, 0]}>
                        {
                            data.map((entry, index) => (
                                <Rectangle
                                    key={`bar-${index}`}
                                    y={entry.goal}
                                    width={20}
                                    height={entry.goal}
                                    fill="hsl(var(--foreground))"
                                />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}