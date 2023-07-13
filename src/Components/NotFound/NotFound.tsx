import React from "react";

const NotFound = ({ title }: NotFoundProps) => {
  return (
    <div className=" flex justify-center items-center mt-5">
      <h2 className="text-3xl font-bold text-red-500">
        {title || "Not Found!"}
      </h2>
    </div>
  );
};
interface NotFoundProps {
  title?: string;
}

export default NotFound;
