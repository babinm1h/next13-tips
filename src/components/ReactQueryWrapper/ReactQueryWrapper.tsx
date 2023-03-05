"use client";

import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },

    mutations: {
      retry: 0,
    },
  },
});

type Props = {
  children: React.ReactNode;
};

const ReactQueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

export default ReactQueryWrapper;
