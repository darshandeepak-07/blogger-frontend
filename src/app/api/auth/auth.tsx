import axios, { AxiosResponse } from "axios";
const API_BASE_URL = "http://localhost:3000";

export const registerUser = async (
  payload: RegisterPayload
): Promise<ApiResponse> => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AxiosResponse<any, any>> => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const verifyUser = async (payload: VerifyPayload) => {
  const response = await axios.post(`${API_BASE_URL}/auth/verify`, payload);
  return response.data;
};
