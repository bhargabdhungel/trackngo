"use client";
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface FetchResult<T> {
  success: boolean;
  message: string;
  data?: T;
  description?: string;
}

function useFetchData<T, Args extends any[]>(
  run: boolean,
  setData: (data: T) => void,
  fetchData: (...args: Args) => Promise<FetchResult<T>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ...args: Args
): void {
  useEffect(() => {
    if (!run) return;

    const fetchDataAsync = async () => {
      setLoading(true);
      try {
        const result = await fetchData(...args);
        if (result.success && result.data) {
          setData(result.data);
        } else {
          toast({
            title: "Error",
            description: result.message,
          });
        }
      } catch (e) {
        console.error(e);
        toast({
          title: "Error",
          description: "You are not authorized to access this page",
        });
      }
      setLoading(false);
    };

    fetchDataAsync();
  }, [args, fetchData, run, setData, setLoading]);
}

export default useFetchData;
