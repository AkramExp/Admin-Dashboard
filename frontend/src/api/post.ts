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

export async function toggleSave(postId: string) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/toggle-save/${postId}`,
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

export async function getSavedPosts() {
  try {
    const response = await axios.get(`${BACKEND_URL}/saved-posts`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}

export async function toggleLikePost(postId: string) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/toggle-like/${postId}`,
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

export async function getPostById(postId: string | undefined) {
  try {
    const response = await axios.get(`${BACKEND_URL}/${postId}`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}

export async function updatePost(updatedPost: any) {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/update/${updatedPost._id}`,
      updatedPost,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}

export async function deletePost(postId: string) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/${postId}`, {
      withCredentials: true,
    });

    console.log(response);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}

export async function getAllPosts() {
  try {
    const response = await axios.get(`${BACKEND_URL}/all`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}

export async function getUserPosts(userId: string | undefined) {
  try {
    const response = await axios.get(`${BACKEND_URL}/user/${userId}`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}

export async function getUserLikedPosts() {
  try {
    const response = await axios.get(`${BACKEND_URL}/liked`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.message;
    }
  }
}
