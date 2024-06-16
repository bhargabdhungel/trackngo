"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import getAllTrips from "@/app/actions/trip/getAll";
import { useRecoilState } from "recoil";
import { tripsAtom } from "@/atoms/trip";
import useFetchData from "@/hooks/useFetchData";
import Loading from "@/components/loading";
import { Trip } from "@/lib/types";
import updateTrips from "@/lib/updateTrips";

export default function GetTrips() {
  const [trips, setTrips] = useRecoilState(tripsAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldRun, setShouldRun] = useState<boolean>(false);
  const [updatedTrips, setUpdatedTrips] = useState<Trip[]>([]);

  useFetchData(shouldRun, setTrips, getAllTrips, setLoading, {});

  useEffect(() => {
    if (trips) {
      setShouldRun(false);
      setUpdatedTrips(updateTrips(trips));
    } else {
      setShouldRun(true);
    }
  }, [trips]);

  if (loading || !trips) return <Loading />;

  return <DataTable columns={columns} data={updatedTrips} />;
}
