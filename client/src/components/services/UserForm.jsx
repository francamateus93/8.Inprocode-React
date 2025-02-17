import { addUser } from "./UserService";
import React, { useState } from "react";

const UserForm = ({ setUsers }) => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    services: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await addUser(form);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setForm({
        full_name: "",
        email: "",
        phone: "",
        location: "",
        services: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleSubmit}>
        {["full_name", "email", "phone", "location", "services"].map(
          (field) => (
            <input
              key={field}
              className="border p-2 w-full"
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.replace("_", " ")}
              onChange={handleChange}
              value={form[field]}
              required
            />
          )
        )}
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
