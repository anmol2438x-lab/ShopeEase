import React from "react";
import { MdHome } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

function NavPagination({productData}) {
  const category = productData.category.charAt(0).toLocaleUpperCase() + productData.category.slice(1).toLocaleLowerCase();
  
  return (
    <nav className="flex mb-6 " aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 ">
        <li className="inline-flex items-center">
          <NavLink
            to="/"
            className="inline-flex gap-1 items-center text-sm font-medium text-gray-700 hover:text-[#d51243]"
          >
            <MdHome />
            Home
          </NavLink>
        </li>
        <li>
          <div className="flex items-center">
            <IoIosArrowForward />
            <NavLink
              to="/shop"
              className="ml-1 text-sm font-medium text-gray-700 hover:text-[#d51243] md:ml-2"
            >
              Shop
            </NavLink>
          </div>
        </li>

        <li aria-current="page">
          <div className="flex items-center">
            <IoIosArrowForward />
            <span className="ml-1 text-sm font-medium text-[#d51243] md:ml-2 line-clamp-1 max-w-xs">
              {category}
            </span>
          </div>
        </li>


        <li aria-current="page">
          <div className="flex items-center">
            <IoIosArrowForward />
            <span className="ml-1 text-sm font-medium text-[#d51243] md:ml-2 line-clamp-1 max-w-xs">
              {productData.title}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}

export default NavPagination;
