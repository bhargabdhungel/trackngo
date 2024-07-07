"use client";

import { Trip } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { toast } from "@/components/ui/use-toast";
import deleteTrip from "@/app/actions/trip/delete";
import useData from "@/hooks/useData";
import getAllTrips from "@/app/actions/trip/getAll";
import { endDateAtom } from "@/atoms/trip";

function DeleteTrip({ id }: { id: number }) {
  const { data: trips, mutate } = useData(getAllTrips, "getAllTrips", {});

  const setEndDate = useSetRecoilState(endDateAtom);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await deleteTrip(id);
      if (response.success) {
        mutate({
          success: true,
          message: "Trip deleted",
          data: trips!.filter((trip) => trip.id !== id),
        });
        setEndDate(new Date());
        toast({ title: "Trip deleted" });
      } else {
        toast({ title: response.message });
      }
    } catch (error) {
      toast({ title: "Server error" });
    } finally {
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="w-full flex justify-start"
        onClick={(event) => event.stopPropagation()}
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this Trip
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Column definitions for the data table
export const columns: ColumnDef<Trip>[] = [
  { accessorKey: "routeFrom", header: "FROM" },
  { accessorKey: "routeTo", header: "TO" },
  { accessorKey: "startTime", header: "START" },
  { accessorKey: "endTime", header: "END" },
  { accessorKey: "fare", header: "FARE" },
  { accessorKey: "maintenanceCost", header: "MAINTENANCE" },
  { accessorKey: "fuelCost", header: "FUEL COST" },
  { accessorKey: "otherCost", header: "OTHER COSTS" },
  { accessorKey: "balance", header: "BALANCE" },
  {
    id: "actions",
    cell: ({ row }) => (
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
            <DeleteTrip id={row.original.id!} />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/drivers/${row.original.driverId}`} className="w-full">
              Driver details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/vehicles/${row.original.busId}`} className="w-full">
              Bus details
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
