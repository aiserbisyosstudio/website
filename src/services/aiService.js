import api from "@/api/axios";
import ENDPOINTS from "@/api/endpoints";

export const generateAiPrompt = async (payload) => {
  const response = await api.post(
    ENDPOINTS.AI.GENERATE_PROMPT,
    payload
  );

  return response.data;
};

export const createAiImage = async (payload) => {
  const response = await api.post(
    ENDPOINTS.AI.CREATE_IMAGE,
    payload
  );

  return response.data;
};