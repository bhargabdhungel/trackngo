import { tripsAtom } from "@/atoms/trip";
import { useRecoilState } from "recoil";
export default function UpdateTrip({ id }: { id: number }) {
  const [trips, setTrips] = useRecoilState(tripsAtom);
  const trip = trips?.find((trip) => trip.id === id);

  if (!trip) return <div>Trip not found</div>;
  console.log(trip);
  return <div>Update Trip</div>;
}
