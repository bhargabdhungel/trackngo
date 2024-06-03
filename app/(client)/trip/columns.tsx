"use client"

import { Trip } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Trip>[] = [
    {
        accessorKey: "routeFrom",
        header: "FROM",
    },
    {
        accessorKey: "routeTo",
        header: "TO",
    },
    {
        accessorKey: "fare",
        header: "FARE",
    },
    {
        accessorKey: "maintenanceCost",
        header: "MAINTENANCE",
    },
    {
        accessorKey: "fuelCost",
        header: "FUEL COST"
    },
    {
        accessorKey: "otherCost",
        header: "OTHER COSTS"
    },
    {
        accessorKey: "startTime",
        header: "START"
    },
    {
        accessorKey: "endTime",
        header: "END"
    },
    {
        accessorKey: "balance",
        header: "BALANCE"
    }
]