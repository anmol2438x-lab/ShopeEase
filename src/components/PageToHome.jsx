import React from "react";
import { FiHome, FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const PageToHome = ({ pageName }) => {
  return (
    <div className="breadcrumb md:mt-5 py-5 bg-rose-50 rounded-lg">
      <div className="mx-auto px-6">
        <div className="breadcrumb-wrapper flex justify-between items-center flex-wrap gap-4">
          <h6 className=" text-2xl font-medium">{pageName}</h6>
          <ul className="flex items-center gap-2 flex-wrap">
            <li className="text-sm">
              <NavLink
                className="text-gray-900 flex items-center gap-2 hover:text-[#d51243] transition-colors"
                to="/"
              >
                <FiHome className="text-base" />
                Home
              </NavLink>
            </li>
            <li className="flex items-center">
              <FiChevronRight className="text-gray-500 text-sm" />
            </li>
            <li className="text-sm text-[#d51243] font-medium">{pageName}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageToHome;
