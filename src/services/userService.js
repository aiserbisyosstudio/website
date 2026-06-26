import api from "@/api/axios";
import ENDPOINTS from "@/api/endpoints";

export const register = async (payload) => {
  const response = await api.post(
    ENDPOINTS.USER.REGISTER,
    payload
  );

  return response.data;
};