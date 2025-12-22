import React, { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function SearchAndLocation({searchValue, setSearchValue, handleSearchClick}) {
  const [location, setLocation] = useState('Mumbai')


  const locations = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Patna",
  ];

  
  return (
    <div className="hidden md:flex flex-1 max-w-2xl items-center gap-3">
      {/* Search with Category Dropdown */}
      <div className="flex items-center flex-1 h-10 md:h-12 bg-white rounded-full overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-[#d51243] focus-within:border-transparent transition-all">
        

        {/* handle laptop screen search */}
        <div className="relative flex-1 h-full">
          <input
            type="text"
            name="search"
            autoComplete="off"
            className="w-full h-full bg-transparent px-3 md:px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            placeholder="Search for products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <NavLink to="/shop">
            <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 bg-[#d51243] hover:bg-[#d51243] rounded-full flex items-center justify-center text-white transition-colors" onClick={() => handleSearchClick(searchValue)}>
              <FiSearch className="text-sm md:text-base" />
            </button>
          </NavLink>
        </div>

      </div>

        
      {/* Location Selector */}
      <div className="hidden lg:flex items-center gap-2 py-1 px-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
        <FiMapPin className="text-gray-600 text-base" />
        <div className="leading-tight">
          <span className="text-xs text-gray-500 block">Location</span>
          <div className="relative">
            <select
              className="appearance-none bg-transparent border-0 pl-0 pr-6 py-0 focus:outline-none text-sm font-medium text-gray-700 cursor-pointer"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {locations.map((location, index) => (
                <option key={index} value={index}>
                  {location}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-500">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default SearchAndLocation;
