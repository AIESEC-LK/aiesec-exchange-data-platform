import React from "react";

const DashboardFooter = () => {
  return (
    <div className="text-center py-4 bg-gray-100 text-gray-600 text-sm">
      <p className="transition duration-300 hover:text-blue-500 hover:scale-105">
        Made with <span className="text-red-500">❤</span> by{" "}
        <strong>&lt;/Dev.Team&gt;</strong> of AIESEC in Sri Lanka in
        collaboration with Operations National Project Managers
      </p>
    </div>
  );
};

export default DashboardFooter;
