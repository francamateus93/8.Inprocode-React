import React, { useState } from "react";
import UserForm from "../components/services/UserForm";
import UserTable from "../components/services/UserTable";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  return (
    <div className="container mx-auto flex-col items-center justify-center h-screen bg-gray-100 p-10">
      <UserForm setUsers={setUsers} />
      <UserTable users={users} setUsers={setUsers} />
    </div>
  );
};

export default UsersPage;
