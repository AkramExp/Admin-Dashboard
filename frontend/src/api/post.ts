import { INewPost } from "@/types";
import axios from "axios";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/post`;

export async function createPost(post: INewPost) {
  try {
    const response = await axios.post(`${BACKEND_URL}/create`, post, {
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

export async function getRecentPosts() {
  try {
    const response = await axios.get(`${BACKEND_URL}/recent-posts`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}
