import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser, updateUser } from "./UserService";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
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
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>Error al cargar los usuarios: {error.message}</p>;
  }

  return (
    <div className="container mx-auto px-4 w-full">
      {editingUser && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <h3>Edit User</h3>
          <form onSubmit={handleEditSubmit}>
            {["full_name", "email", "phone", "location", "services"].map(
              (field) => (
                <input
                  key={field}
                  className="border p-2 w-full mb-2"
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.replace("_", " ")}
                  onChange={handleEditChange}
                  value={editForm[field] || ""} // Usar el estado editForm
                  required
                />
              )
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {[
              "ID",
              "Full Name",
              "Email",
              "Phone",
              "Location",
              "Services",
              "Actions",
            ].map((header) => (
              <th key={header} className="py-2 px-4 border">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.id} className="text-center">
                {[
                  "id",
                  "full_name",
                  "email",
                  "phone",
                  "location",
                  "services",
                ].map((key) => (
                  <td key={key} className="py-2 px-4 border">
                    {user[key]}
                  </td>
                ))}
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEdit(user)} // Llama a handleEdit
                    className="bg-yellow-500 text-white px-3 py-1 rounded mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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
