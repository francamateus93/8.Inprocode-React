import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    setUsers(Array.isArray(response.data) ? response.data : []);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return [];
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
