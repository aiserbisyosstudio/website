import api from "@/api/axios";
import ENDPOINTS from "@/api/endpoints";

export const login = async (payload) => {
  const response = await api.post(
    ENDPOINTS.AUTH.LOGIN,
    payload
  );

  return response.data;
};

export const logout = async (payload) => {
  const response = await api.post(
    ENDPOINTS.AUTH.LOGOUT,
    payload
  );

  return response.data;
};