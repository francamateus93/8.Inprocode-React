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
    <div className="container mx-auto w-1/2">
      <div className="mb-8 p-6 mx-auto rounded-xl transition duration-200 hover:shadow-lg">
        <h2 className="text-xl font-bold mb-2 text-orange-400">Add User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {["Full Name", "Email", "Phone", "Location", "Services"].map(
            (field) => (
              <input
                key={field}
                className="border border-gray-300/50 text-gray-500 text-sm p-2 m-1 ml-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field.replace("_", " ")}
                onChange={handleChange}
                value={form[field]}
                required
              />
            )
          )}
          <button className="bg-orange-400/90 text-white text-lg hover:bg-orange-500/80 px-4 py-2 mt-3 rounded font-medium">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
