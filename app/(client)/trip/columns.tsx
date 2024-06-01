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
]