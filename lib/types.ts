import { BusDocumentType } from "@prisma/client";
import { DriverDocumentType } from "@prisma/client";

export interface User {
  userId?: number;
  name?: string;
  email?: string;
  image?: string;
}

export interface VehicleDocument {
  id?: number;
  busId: number;
  type: BusDocumentType;
  link: string;
  expiryDate: Date;
}
export interface DriverDocument {
  id?: number;
  driverId: number;
  type: DriverDocumentType;
  link: string;
  expiryDate: Date;
}

export interface Vehicle {
  id?: number;
  name: string;
  userId: number;
  documents?: VehicleDocument[];
}

export interface Driver {
  id?: number;
  name: string;
  contact: string;
  userId: number;
  documents?: DriverDocument[];
}

export interface SelectorProps {
  placeholder: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  setSelected: (value: string) => void;
}

export interface Trip {
  id?: number;
  busId: number;
  driverId: number;
  userId: number;
  routeFrom: string;
  routeTo: string;
  startTime: Date | string;
  endTime: Date | string;
  fare: number | null;
  maintenanceCost: number | null;
  fuelCost: number | null;
  otherCost: number | null;
  description: string | null;
  balance?: number;
}

export interface FormattedTrip {
  id?: number;
  busId: number;
  driverId: number;
  userId: number;
  routeFrom: string;
  routeTo: string;
  startTime: string;
  endTime: string;
  fare: number | null;
  maintenanceCost: number | null;
  fuelCost: number | null;
  otherCost: number | null;
  description: string | null;
  balance?: number;
}

export interface UserData {
  userId: number;
  name: string;
  email: string;
  image: string | null;
  paid: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TripSummary = {
  totalMaintenanceCost: number;
  totalFuelCost: number;
  totalFare: number;
  totalOtherCost: number;
  totalBalance: number;
  maxMaintenanceCost: number;
  maxFuelCost: number;
  maxBalance: number;
  maxOtherCost: number;
};

export enum ChartType {
  Pie = "pie",
  Radar = "radar",
  Smooth = "smooth",
  Area = "area",
  Discrete = "discrete",
  Race = "race",
}
