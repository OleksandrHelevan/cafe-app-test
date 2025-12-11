"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { QueryCache } from "@tanstack/query-core";
import { showNotification } from "~/core/util/notifications";

interface ReactQueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error) => {
      showNotification({ text: error.message, mode: 'error' });
    },
  }),
});

export default function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      </QueryClientProvider>
  );
}