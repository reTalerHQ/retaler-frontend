import { StrictMode } from "react";
import { UserProvider } from "./context/user-context-provider.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // retry: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <App />
      </UserProvider>
      <Toaster position="top-center" richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
