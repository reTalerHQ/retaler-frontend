import { useQuery } from "@tanstack/react-query";
import { TOKEN_IDENTIFIER } from "@/constants";
import axiosInstance from "@/lib/axios";
import { BASE_URL } from "@/constants/api";
import { FETCH_INVENTORY } from "@/constants/query-key";

export const useFetchInventory = (storeId) => {
  return useQuery({
    queryKey: [FETCH_INVENTORY, storeId],
    queryFn: async () => {
      const token = sessionStorage.getItem(TOKEN_IDENTIFIER);
      const response = await axiosInstance.get(
        `${BASE_URL}/v1/store/${storeId}/inventory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response?.data;
    },
    enabled: Boolean(storeId),
  });
};
