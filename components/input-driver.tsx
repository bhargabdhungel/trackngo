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
import addDriver from "@/app/actions/driver/add";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { driversAtom } from "@/atoms/driver";
import Loading from "./loading";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Driver name is too short",
  }),
  contact: z.string().min(5, {
    message: "Contact is too short",
  }),
});

export default function InputDriver() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const setDrivers = useSetRecoilState(driversAtom);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      contact: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await addDriver(data.name, data.contact);
      if (response.success) {
        setDrivers((currentDrivers) => {
          if (!currentDrivers) return [response.data!];
          return [...currentDrivers, response.data!];
        });
        form.reset();
        router.replace("/driver");
      }
      toast({
        title: response.message,
        description: response.description,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Failed to add driver",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name of the driver" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the driver</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input placeholder="Contact number" {...field} />
              </FormControl>
              <FormDescription>Enter the contact number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
