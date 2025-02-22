import React, { useState } from "react";
import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  return (
    <div className="container mx-auto flex items-center justify-center">
      <UserForm setUsers={setUsers} />
      <UserTable users={users} setUsers={setUsers} />
    </div>
  );
};

export default UsersPage;
