import { cookies } from "next/headers";
import useSWR from "swr";
import crypto from "crypto";

interface FetchResult<T> {
  success: boolean;
  message: string;
  data?: T;
  description?: string;
}

function hashCode(s: string) {
  return crypto.createHash("md5").update(s).digest("hex");
}

export default function useData<T, Args extends any[]>(
  fetchData: (...args: Args) => Promise<FetchResult<T>>,
  key: string,
  ...args: Args
) {
  if (args) key = key + JSON.stringify(args);
  console.log("key", key);
  const { data, error, mutate } = useSWR(key, () => fetchData(...args), {
    revalidateOnFocus: true,
    refreshInterval: 300000,
    revalidateOnReconnect: true,
    errorRetryCount: 2,
  });

  return {
    data: data?.data,
    isLoading: !error && !data,
    mutate,
  };
}
