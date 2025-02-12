import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "./UserService";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      fetchUsers().then(setUsers).catch(console.error);
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUser) => prevUser.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
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
          {users.map((user) => (
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
                <button className="bg-yellow-500 text-white px-3 py-1 rounded mx-1">
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
