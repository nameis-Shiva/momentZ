import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true, // to set token and send in cookies
});



// ================= REGISTER =================
export const register = async (formData) => {
  try {
    const response = await API.post("/register", formData );

    return response.data;
  } catch (error) {
    console.error("Register Error: ", error.response?.data || error.message);
    throw error;
  }
};

// ================= LOGIN =================
export const login = async (username, password) => {
  try {
    const response = await API.post("/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Login Error: ", error.response?.data || error.message);
    throw error;
  }
};

// ================= getMyDetails =================
export const getMe = async () => {
  try {
    const response = await API.get("/get-me")
    return response.data;
  } catch (error) {
    console.error("Error while fetching my details: ", error.response?.data || error.message);
  }
}