"use client";
import { tripsAtom } from "@/atoms/trip";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ImageComponent from "next/image";
import rightArrow from "../../../../arrow-right.png";

export default function TripDetails() {
  const [trips, setTrips] = useRecoilState(tripsAtom);
  const router = useRouter();
  useEffect(() => {
    if (!trips) router.replace("/trip");
  }, [router, trips]);

  const tripId = parseInt(usePathname().split("/").pop() as string, 10);
  const trip = trips?.find((trip) => trip.id === tripId);
  if (!trip) return <div>Trip not found</div>;

  const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatTime = (dateString: Date | string) => {
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
    <>
      <div className="flex flex-row mx-4 mt-10 items-center justify-center">
        <div className="w-1/2 px-4">
          <p className="text-right text-2xl">{trip.routeFrom}</p>
        </div>

        <div className="mx-2 flex-shrink-0">
          <ImageComponent
            src={rightArrow}
            alt="Right Arrow"
            width={30}
            height={30}
          />
        </div>

        <div className="w-1/2 px-4 text-2xl">
          <p className="text-left">{trip.routeTo}</p>
        </div>
      </div>

      <div className="mx-16 mt-8 flex flex-wrap gap-4 items-center justify-center">
        <div className="flex flex-col p-2 rounded-lg shadow-md  w-full">
          <label className="font-semibold">Description:</label>
          <p className="p-2 mt-1 border rounded">{trip.description}</p>
        </div>
        <div className="flex flex-col p-2 rounded-lg shadow-md items-center justify-center">
          <label className="font-semibold">Start Date:</label>
          <p className="p-2 mt-1 border rounded w-32 text-center">
            {formatDate(trip.startTime)}
          </p>
        </div>
        <div className="flex flex-col p-2 rounded-lg shadow-md items-center justify-center">
          <label className="font-semibold">Start Time:</label>
          <p className="p-2 mt-1 border rounded w-32 text-center">
            {formatTime(trip.startTime)}
          </p>
        </div>
        <div className="flex flex-col p-2 rounded-lg shadow-md items-center justify-center">
          <label className="font-semibold">End Date:</label>
          <p className="p-2 mt-1 border rounded w-32 text-center">
            {formatDate(trip.endTime)}
          </p>
        </div>
        <div className="flex flex-col p-2 rounded-lg shadow-md items-center justify-center">
          <label className="font-semibold">End Time:</label>
          <p className="p-2 mt-1 border rounded w-32 text-center">
            {formatTime(trip.endTime)}
          </p>
        </div>
        <div className="flex flex-col p-2 rounded-lg shadow-md items-center justify-center">
          <label className="font-semibold">Fare:</label>
          <p className="p-2 mt-1 border rounded w-32 text-center">
            {trip.fare}
          </p>
        </div>
        <div className="flex flex-col p-2 rounded-lg shadow-md items-center justify-center">
          <label className="font-semibold">Fuel Cost:</label>
          <p className="p-2 mt-1 border rounded w-32 text-center">
            {trip.fuelCost}
          </p>
        </div>
        <div className="flex flex-col p-2 rounded-lg shadow-md items-center justify-center">
          <label className="font-semibold">Maintenance Cost:</label>
          <p className="p-2 mt-1 border rounded w-32 text-center">
            {trip.maintenanceCost}
          </p>
        </div>
        <div className="flex flex-col p-2 rounded-lg shadow-md items-center justify-center">
          <label className="font-semibold">Other Expenses:</label>
          <p className="p-2 mt-1 border rounded w-32 text-center">
            {trip.otherCost}
          </p>
        </div>
      </div>
    </>
  );
}
