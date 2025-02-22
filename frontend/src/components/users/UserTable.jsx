import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser, updateUser } from "./UserService";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm(user);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editForm);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === editingUser.id ? editForm : user))
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error loading users: {error.message}</p>;
  }

  return (
    <div className="container mx-auto w-full px-4">
      {editingUser && (
        <div className="mb-4 p-6 mx-auto w-1/2 rounded-xl transition duration-200 hover:shadow-lg">
          <h3 className="text-xl font-bold mb-2 text-orange-400">Edit User</h3>
          <form onSubmit={handleEditSubmit}>
            {["full_name", "email", "phone", "location", "services"].map(
              (field) => (
                <input
                  key={field}
                  className="border border-gray-300/50 text-gray-500 text-sm p-2 m-1 ml-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.replace("_", " ").toUpperCase()}
                  onChange={handleEditChange}
                  value={editForm[field] || ""}
                  required
                />
              )
            )}
            <div className="flex justify-between mt-2">
              <button
                type="submit"
                className="bg-orange-400 text-white font-medium px-5 py-1 rounded-md hover:bg-orange-600/80 hover:text-white transition duration-300"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="bg-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-400 text-white transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <table className="p-4 my-8 bg-white mx-auto overflow-hidden">
        <thead>
          <tr className=" text-orange-400 text-start">
            {["Full Name", "Email", "Phone", "Location", "Services"].map(
              (header) => (
                <th key={header} className="py-3 px-4 text-start">
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => (
              <tr
                key={user.id}
                className="text-start hover:bg-gray-100 transition duration-200"
              >
                {["full_name", "email", "phone", "location", "services"].map(
                  (key) => (
                    <td key={key} className="py-4 px-4 text-gray-500 text-sm">
                      {user[key]}
                    </td>
                  )
                )}
                <td className="flex gap-1">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-orange-400 text-white font-medium px-5 py-1 rounded-md hover:bg-orange-600/80 hover:text-orange-50 transition duration-300 mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500/10 text-red-500 font-medium px-5 py-1 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
