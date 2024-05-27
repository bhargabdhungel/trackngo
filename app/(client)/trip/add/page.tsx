"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import getAllVehicles from "@/app/actions/vehicle/getAll";
import { useEffect, useState } from "react";
import { Vehicles } from "@/lib/types";
import { Selector } from "@/components/selector";
import MoneyInput from "@/components/MoneyInput/MoneyInput";
import addTrip from "@/app/actions/trip/addTrip";

type VehiclesType = Vehicles[];

const formSchema = z.object({
    routeFrom: z.string().min(1, { message: "Route from is required." }),
    routeTo: z.string().min(1, { message: "Route to is required." }),
    startTime: z.string(),
    endTime: z.string(),
    fare: z.coerce.number().min(0, "Required"),
    maintenanceCost: z.coerce.number().min(0.01, "Required"),
    busName: z.string(),
    driverId: z.number()
});

export default function AddTrip() {
    const sampleDrivers: { id: number; name: string }[] = [
        { id: 1, name: "Rohan" },
        { id: 2, name: "Totu" },
        { id: 3, name: "Mohit" },
        { id: 4, name: "Bhargab" },
        { id: 5, name: "Priyanshu" },
    ]
    const [driverId, setDriverId] = useState<number>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Gets all the vehicles
    const [allVehicles, setAllVehicles] = useState<VehiclesType | null>(null);

    // To select a bus
    const [busName, setBusName] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            routeFrom: "",
            routeTo: "",
            startTime: new Date().toISOString().slice(0, 16),
            endTime: new Date().toISOString().slice(0, 16),
            fare: 0,
            maintenanceCost: 0,
            busName: "",
            driverId: 0
        },
        mode: "onTouched",
    });

    useEffect(() => {
        const loadVehicles = async () => {
            try {
                setIsLoading(true);

                const getVehicles = await getAllVehicles();
                setAllVehicles(getVehicles);

                setIsLoading(false)
            } catch (error) {
                console.error(error)
            }
        }

        loadVehicles()
    }, [setAllVehicles])

    const options = allVehicles ? allVehicles.map((vehicle: Vehicles) => ({
        value: vehicle.name,
        label: vehicle.name
    })) : []

    const driverOptions = sampleDrivers ? sampleDrivers.map((driver: { id: number; name: string }) => ({
        value: driver.name,
        label: driver.name
    })) : []

    async function onSubmit(values: z.infer<typeof formSchema>) {
        values.busName = busName

        console.log(values)

        // const response: { success: boolean; message: string; description: string } = await addTrip(
        //     values.busName,
        //     values.driverId,
        //     values.routeFrom,
        //     values.routeTo,
        //     new Date(values.startTime),
        //     new Date(values.endTime),
        //     values.fare,
        //     values.maintenanceCost
        // )
        // console.log(response);
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-10">
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

                    <MoneyInput
                        form={form}
                        label="Fare"
                        name="fare"
                        placeholder=""
                    />

                    <MoneyInput
                        form={form}
                        label="Maintenance Cost"
                        name="maintenanceCost"
                        placeholder=""
                    />

                    <Selector
                        label="Vehicles"
                        options={options}
                        placeholder="Choose a vehicle"
                        setSelected={setBusName}
                    />

                    <Selector
                        label="Drivers"
                        options={driverOptions}
                        placeholder="Choose a driver"
                        setSelected={(selectedDriverName: string) => {
                            const selectedDriver = sampleDrivers.find(driver => driver.name === selectedDriverName);
                            if (selectedDriver) {
                                setDriverId(selectedDriver.id);
                            }
                        }}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}