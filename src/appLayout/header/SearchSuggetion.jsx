import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { applyFilters, updateFilterValues } from "../../slice/filterReducer";

import { IoIosArrowForward } from "react-icons/io";

function SearchSuggestion({ handleSearchClick, searchValue }) {
  const { allProducts } = useSelector((state) => state.filterReducer);

  const filterSuggetions = useMemo(() => {
    return [
      searchValue,
      ...allProducts.filter(
        (item) =>
          item.description.toLowerCase().includes(searchValue.toLowerCase()) &&
          item.title.toLowerCase().includes(searchValue.toLowerCase())
      ),
    ];
  });

  return (
    <div
      className="absolute left-3 lg:left-1/3 top-16 w-80 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden z-50"
      role="listbox"
      aria-label="Search suggestions"
    >
      {allProducts.length !== 0 ? (
        <div className="max-h-96 overflow-y-auto">
          <ul className="divide-y divide-rose-100">
            {filterSuggetions.slice(0, 7).map((item) => (
              <NavLink to="/shop" key={item.id || item.title || searchValue}>
                <li
                  onClick={() => handleSearchClick(item.title || searchValue)}
                  className="px-4 py-3 hover:bg-rose-50 cursor-pointer transition-all duration-200 flex items-start group"
                  role="option"
                  tabIndex={0}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 truncate group-hover:text-[#d51243]">
                      {item.title || searchValue}
                    </div>
                    {item.category && (
                      <div className="text-xs text-rose-600 mt-1 font-medium">
                        {item.category || ""}
                      </div>
                    )}
                  </div>

                  <IoIosArrowForward />
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-4 text-gray-800">No suggestions found</div>
      )}
    </div>
  );
}

export default SearchSuggestion;
