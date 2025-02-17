import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5001/users");
    console.log("Fetched users:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    const response = await axios.post("http://localhost:5001/users", user);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:5001/users/users/${id}`);
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response?.data || error.message
    );
    throw error;
  }
};
