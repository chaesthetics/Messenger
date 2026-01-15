import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const signUp = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<{ message: string; status: number }> => {
  try {
    const data = { firstname, lastname, email, password };
    const response = await axios.post(`${baseURL}/api/register`, data);
    const { message, status } = response.data;

    return { message, status };
  } catch (error: any) {
    const message =
      typeof error === "string"
        ? error
        : error?.response?.data.message || "An error occurred";
    const status = error?.response?.data.status || 500;
    return { message, status };
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<{
  status: number;
  message: string;
  token: string | null;
  userData: any | null;
}> => {
  try {
    const response = await axios.post(`${baseURL}/api/signin`, { email, password });
    const { status, message, token, userData } = response.data;

    // ✅ Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    return { status, message, token, userData };
  } catch (error: any) {
    const status =
      typeof error === "number"
        ? error
        : error?.response?.data.status || 500;
    const message =
      typeof error === "string"
        ? error
        : error?.response?.data.message || "An error occurred";

    return { status, message, token: null, userData: null };
  }
};

export const logOut = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
  }
};

export const getAllUser = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/getUsers`);
    return response.data.data;
  } catch (error: any) {
    const data =
      typeof error === "string"
        ? error
        : error?.response?.data.message || "An error occurred";
    return { data };
  }
};

export const getConversations = async (userinfo_id: number) => {
  try {
    const response = await axios.get(`${baseURL}/api/getConversations/${userinfo_id}`);
    return response.data.conversations;
  } catch (error: any) {
    return error;
  }
};

export const getMessages = async (conversation_id: number) => {
  try {
    const response = await axios.get(`${baseURL}/api/getMessages/${conversation_id}`);
    return response.data.messages;
  } catch (error: any) {
    return error;
  }
};

export const createMessage = async (
  conversation_id: any,
  sender_id: number,
  content: string
) => {
  try {
    const response = await axios.post(`${baseURL}/api/createMessage`, {
      conversation_id,
      sender_id,
      content,
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const searchUsers = async (userName: string) => {
  try {
    const response = await axios.get(`${baseURL}/api/searchUser`, {
      params: { userName },
    });

    return response.data.users;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};
