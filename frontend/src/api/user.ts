import { INewUser } from "@/types";
import axios from "axios";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/user`;

export async function registerUser(user: INewUser) {
  try {
    const response = await axios.post(`${BACKEND_URL}/register`, user, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}

export async function getCurrentUser() {
  try {
    const response = await axios.get(`${BACKEND_URL}/`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}
