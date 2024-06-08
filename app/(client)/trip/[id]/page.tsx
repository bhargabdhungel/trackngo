"use client";
import { tripsAtom } from "@/atoms/trip";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import ImageComponent from "next/image";
import rightArrow from "../../../../arrow-right.png";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TripDetails() {
  const trips = useRecoilValue(tripsAtom);
  const router = useRouter();
  const tripId = parseInt(usePathname().split("/").pop() as string, 10);

  useEffect(() => {
    if (!trips) router.replace("/trip");
  }, [trips, router]);

  const trip = trips?.find((trip) => trip.id === tripId);
  if (!trip) return <div>Trip not found</div>;

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatTime = (dateString: Date) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const formatValue = (value: any) => {
    if (value instanceof Date) {
      return `${formatDate(value)} ${formatTime(value)}`;
    }
    return value;
  };

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableCaption>Trip Details</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(trip).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{formatValue(value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
