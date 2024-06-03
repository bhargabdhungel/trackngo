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
  image?: string | null;
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
  startTime: Date;
  endTime: Date;
  fare: number | null;
  maintenanceCost: number | null;
  fuelCost: number | null;
  otherCost: number | null;
  description: string | null;
  balance?: number
}
