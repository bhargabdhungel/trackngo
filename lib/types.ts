import { BusDocumentType } from "@prisma/client";

export interface User {
  name?: string;
  email?: string;
  image?: string;
}

export interface VehicleDocument {
  id: number;
  busId: number;
  type: BusDocumentType;
  link: string;
  expiryDate: Date;
}
export interface Vehicle {
  id: number;
  name: string;
  userId: number;
  documents?: VehicleDocument[];
}
