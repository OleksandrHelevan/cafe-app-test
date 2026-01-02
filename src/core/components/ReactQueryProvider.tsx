"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { QueryCache } from "@tanstack/query-core";
import { toast } from "react-toastify";

interface ReactQueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      let message = "Something went wrong";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      toast.error(message, { autoClose: 3000 });
    },
  }),
});

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
