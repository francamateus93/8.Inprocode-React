import axios from "axios";
import React, { useState } from "react";

const UserForm = ({ userAdded }) => {
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
      await axios.post("http://localhost:5001/users", form);
      userAdded();
      setForm({
        full_name: "",
        email: "",
        phone: "",
        location: "",
        services: "",
      });
    } catch (error) {
      console.log("Error to handle user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full"
          type="text"
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
          value={form.full_name}
          required
        />
        <input
          className="border p-2 w-full"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
        />
        <input
          className="border p-2 w-full"
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          value={form.phone}
          required
        />
        <input
          className="border p-2 w-full"
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          value={form.location}
          required
        />
        <input
          className="border p-2 w-full"
          type="text"
          name="services"
          placeholder="Services"
          onChange={handleChange}
          value={form.services}
          required
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
