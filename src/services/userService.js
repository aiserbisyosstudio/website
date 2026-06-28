import api from "@/api/axios";
import ENDPOINTS from "@/api/endpoints";

export const register = async (payload) => {
  const response = await api.post(
    ENDPOINTS.USER.REGISTER,
    payload
  );

  return response.data;
};

export const updateLanguage = async (payload) => {
  const response = await api.post(
    ENDPOINTS.USER.UPDATE_LANGUAGE,
    payload
  );

  return response.data;
};

export const updatePlan = async (payload) => {
  const response = await api.post(
    ENDPOINTS.USER.UPDATE_PLAN,
    payload
  );

  return response.data;
};