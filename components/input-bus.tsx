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
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
// import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  vehiclename: z.string().min(2, {
    message: "vehilename is too short",
  }),
});

export function InputBus() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vehiclename: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const response = await addBus(data.vehiclename);
    if (response.success) {
      form.reset();
      toast({
        title: response.message,
        description: response.description,
      });
      router.replace("/");
    } else {
      toast({
        title: response.message,
        description: response.description,
      });
    }
    setLoading(false);
  }

  if (loading) return <div>Loading...</div>;

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
