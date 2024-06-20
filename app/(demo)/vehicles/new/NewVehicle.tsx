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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import addBus from "@/app/actions/vehicle/add";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import getAllVehicles from "@/app/actions/vehicle/getAll";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useData from "@/hooks/useData";

const FormSchema = z.object({
  vehiclename: z.string().min(2, {
    message: "vehile number is too short",
  }),
});

export default function NewVehicle() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vehiclename: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const {
    data: vehicles,
    isLoading,
    mutate,
  } = useData(getAllVehicles, "getAllVehicles");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await addBus(data.vehiclename);
      if (response.success) {
        mutate({
          success: true,
          message: "Vehicle added successfully",
          data: [...vehicles!, response.data!],
        });

        toast({
          title: response.message,
          description: response.description,
        });

        form.reset();
        router.replace("/vehicles");
      }
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

  if (loading || isLoading) return <Loading />;

  return (
    <div className="flex justify-center items-center h-[calc(100vh-112px)] w-full">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Add a Vehicle</CardTitle>
          <CardDescription>add a new vehicle to the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="vehiclename"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Vehicle number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Vehicle number should be unique
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
