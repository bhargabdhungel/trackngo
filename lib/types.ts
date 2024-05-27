import { BusDocumentType } from "@prisma/client";

export interface User {
  name?: string;
  email?: string;
  image?: string;
}
export interface Vehicle {
  id: number;
  name: string;
  documents: {
    id: number;
    busId: number;
    type: BusDocumentType;
    link: string;
    expiryDate: Date;
  }[];
}

export interface Vehicles {
  id: number;
  name: string;
  userId: number;
}
