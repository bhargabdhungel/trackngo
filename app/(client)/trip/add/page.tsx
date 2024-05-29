"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Selector } from "@/components/selector";
import { useRecoilState, useRecoilValue } from "recoil";
import { vehiclesAtom } from "@/atoms/vehicle";
import { Vehicle } from "@/lib/types";

const formSchema = z.object({
  routeFrom: z.string().min(1, { message: "Route from is required." }),
  routeTo: z.string().min(1, { message: "Route to is required." }),
  startTime: z.string(),
  endTime: z.string(),
  fare: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .nonnegative()
      .min(0, { message: "Fare must be a non-negative number." })
  ),
  maintenanceCost: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .nonnegative()
      .min(0, { message: "Maintenance cost must be a non-negative number." })
  ),
});

export default function AddTrip() {
  const vehicles: Vehicle[] | null = useRecoilValue(vehiclesAtom);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      routeFrom: "",
      routeTo: "",
      startTime: new Date().toISOString().slice(0, 16),
      endTime: new Date().toISOString().slice(0, 16),
      fare: 0,
      maintenanceCost: 0,
    },
  });

  const options = vehicles
    ? vehicles.map((vehicle: any) => ({
        value: vehicle.name,
        label: vehicle.name,
      }))
    : [];

  const [busName, setBusName] = useState<string>("");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(busName);
  }

  // Send bus name in backend
  // Get all vehicles name from actions/vehicles
  // Selector to get a vehicle(bus name)
  // Send bus name with others to backend

  // Under actions
  // Create a backend file to get bus id from backend

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 px-10"
        >
          <FormField
            name="routeFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Route From</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="routeTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Route To</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="fare"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fare</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="maintenanceCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maintenance Cost</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Selector
            label="Vehicles"
            options={options}
            placeholder="Choose a vehicle"
            setSelected={setBusName}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
