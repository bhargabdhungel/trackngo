"use server";
import prisma from "@/prisma/db";
import authCheck from "../auth/authCheck";
import { Driver } from "@/lib/types";

export default async function addDriver(name: string, contact: string) {
  const user = await authCheck();
  name = name.trim().replace(/\b\w/g, (char) => char.toUpperCase());
  contact = contact.trim();

  // Check if driver already exists with the same name or contact
  const driverExists = await prisma.driver.findFirst({
    where: {
      userId: user.userId,
      OR: [
        {
          name: name,
        },
        {
          contact: contact,
        },
      ],
    },
    select: {
      id: true,
    },
  });

  if (driverExists) {
    return {
      success: false,
      message: "Driver already exists",
      description:
        "A driver with the same name or contact already exists in the system",
    };
  }

  // Create new driver
  const driver: Driver = await prisma.driver.create({
    data: {
      name: name,
      contact: contact,
      userId: user.userId,
    },
    include: {
      documents: true,
    },
  });

  return {
    success: true,
    message: "Driver added successfully",
    description: `${name} has been added to the system`,
    data: driver,
  };
}
