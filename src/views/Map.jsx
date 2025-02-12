import React from "react";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

const Map = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Map</h1>
      <div className="w-full h-96 bg-blue-200">
        <UserForm />
        <UserTable />
      </div>
    </div>
  );
};

export default Map;
