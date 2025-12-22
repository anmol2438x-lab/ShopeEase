import React, { memo } from "react";
import { FiFrown, FiFilter, FiX } from "react-icons/fi";
import { FiGrid, FiList, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setGridView, setSortingValue } from "../../slice/filterReducer";

const Sorting = ({showFilter, setFilter}) => {
  const {gridView, sortingValue} = useSelector((state) => state.filterReducer)
  const dispatch = useDispatch()  
  


  const sortingOptions = [
    { value: "", label: "Sort By" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "lowest", label: "Lowest Rating" },
    { value: "rating", label: "Highest Rating" },
    { value: "a-z", label: "Product: A-Z" },
    { value: "z-a", label: "Product: Z-A" },
  ];

  return (
    <div className="flex justify-between lg:block items-center bg-white py-4 px-8 rounded-lg shadow-sm mb-6">
      
      <div className="flex md:flex-row justify-between items-center gap-4">

        
        {/* View grid/list Toggle - Stays on left */}
        <div className="flex items-center gap-2 order-1 sm:order-none">
          <button
            onClick={() => dispatch(setGridView(true))}
            className={`p-2 rounded-md ${gridView ? "bg-rose-100 text-[#d51243]" : "bg-gray-100 text-gray-600"}`}
          >
            <FiGrid className="text-lg" />
          </button>
          <button
            onClick={() => dispatch(setGridView(false))}
            className={`p-2 rounded-md ${!gridView ? "bg-rose-100 text-[#d51243]" : "bg-gray-100 text-gray-600"}`}
          >
            <FiList className="text-lg" />
          </button>
        </div>
  
       
  
        {/* Sort Dropdown - Takes full width on mobile */}
        <div className="relative w-full sm:w-auto order-2 sm:order-none">
          <select
            value={sortingValue}
            onChange={(e) => dispatch(setSortingValue(e.target.value))}
            className="appearance-none bg-rose-50 border border-rose-100 text-gray-900 py-2 pl-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent text-sm w-full"
          >
            {sortingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
      <div className='lg:hidden p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-rose-50 cursor-pointer' onClick={() => setFilter(!showFilter)} >{showFilter? <FiX /> : <FiFilter />}</div>
    </div>
  );
};

export default Sorting;