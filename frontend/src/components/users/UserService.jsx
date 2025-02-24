import axios from "axios";

const API_URL = "http://localhost:5001";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
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
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateUser = async (user) => {
  try {
    const response = await axios.put(`${API_URL}/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    throw error;
  }
};
