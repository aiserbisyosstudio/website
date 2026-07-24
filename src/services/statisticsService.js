import api from "@/api/axios";
import ENDPOINTS from "@/api/endpoints";

export const getUserProfileStatistics = async (payload) => {
  const response = await api.post(
    ENDPOINTS.STATISTICS.PROFILE_STATS,
    payload
  );

  return response.data;
};