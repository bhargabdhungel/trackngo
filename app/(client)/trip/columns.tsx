"use client";

import { Trip } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

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
    header: "FUEL COST",
  },
  {
    accessorKey: "otherCost",
    header: "OTHER COSTS",
  },
  {
    accessorKey: "startTime",
    header: "START",
  },
  {
    accessorKey: "endTime",
    header: "END",
  },
  {
    accessorKey: "balance",
    header: "BALANCE",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { driverId } = row.original;
      const { busId } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/driver/${driverId}`}>View Driver details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/vehicle/${busId}`}>View Bus details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
