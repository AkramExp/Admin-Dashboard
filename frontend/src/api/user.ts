import { INewUser, IUser } from "@/types";
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

export async function loginUser(user: { username: string; password: string }) {
  try {
    const response = await axios.post(`${BACKEND_URL}/login`, user, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}

export async function logoutUser() {
  try {
    localStorage.removeItem("userToken");
    const response = await axios.post(
      `${BACKEND_URL}/logout`,
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}

export async function getCurrentUser() {
  try {
    let userToken = localStorage.getItem("userToken");
    if (userToken) {
      document.cookie = "userToken = " + userToken;
    }

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

export async function getUserById(userId: string | undefined) {
  try {
    const response = await axios.get(`${BACKEND_URL}/${userId}`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}

export async function updateUser(user: any) {
  try {
    const response = await axios.patch(`${BACKEND_URL}/update`, user, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}
