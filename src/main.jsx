import { StrictMode } from "react";
import { UserProvider } from "./context/user-context-provider.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/theme-context.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { BASE_URL } from "./constants/api.js";
import { TOKEN_IDENTIFIER } from "./constants/index.js";



const defaultQueryFn = async ({ queryKey }) => {
  const [, storeId, filters = {}] = queryKey;
  const queryString = new URLSearchParams(filters).toString()
  const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
  const { data } = await axios.get(`${BASE_URL}/v1/store/${storeId}/staff?${queryString}`, {
    headers: {
      Authorization: `Bearer ${tokenFromStorage}`,
    },
  });
  return data?.data || [];
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchOnWindowFocus: false,
      // retry: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserProvider>
      <Toaster position="top-center" richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
