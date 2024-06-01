"use client"

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
    id: number
    from: string
    to: string
    driver: string
    fare: number
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "from",
        header: "FROM",
    },
    {
        accessorKey: "to",
        header: "TO",
    },
    // {
    //     accessorKey: "driver",
    //     header: "DRIVER",
    // },
    {
        accessorKey: "fare",
        header: "FARE",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("fare"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
            }).format(amount);

            return <div className="text-left font-medium">{formatted}</div>;
        },
    },
]