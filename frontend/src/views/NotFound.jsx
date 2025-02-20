import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <span className="font-extrabold text-[10rem]">404</span>
      <h1 className="px-4 text-4xl font-bold mb-4">
        Sorry, we couldn't find the page you're looking for...
      </h1>
      <p className="p-4">
        We've looked everywhere, but we couldn't find that one...
      </p>
    </div>
  );
};
export default NotFound;
