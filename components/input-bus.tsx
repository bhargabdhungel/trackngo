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
import addBus from "@/app/actions/vehicle/add";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { vehiclesAtom } from "@/atoms/vehicle";
import Loading from "@/app/loading";
import useFetchData from "@/hooks/useFetchData";
import getAllVehicles from "@/app/actions/vehicle/getAll";

const FormSchema = z.object({
  vehiclename: z.string().min(2, {
    message: "vehilename is too short",
  }),
});

export default function InputBus() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vehiclename: "",
    },
  });
  const [vehicles, setVehicles] = useRecoilState(vehiclesAtom);
  const shouldRun = vehicles ? false : true;
  useFetchData(shouldRun, setVehicles, getAllVehicles, setLoading);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await addBus(data.vehiclename);
      if (response.success) {
        setVehicles((currentVehicles) => {
          if (!currentVehicles) return [response.data!];
          return [...currentVehicles, response.data!];
        });
        form.reset();
        router.replace("/vehicle");
      }
      toast({
        title: response.message,
        description: response.description,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="vehiclename"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle</FormLabel>
              <FormControl>
                <Input placeholder="name of the vehicle" {...field} />
              </FormControl>
              <FormDescription>Vehicle name should be unique</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
