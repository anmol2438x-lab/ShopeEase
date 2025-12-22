import React from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterValues } from "../../slice/filterReducer";

function CheckBrand() {
  const { brands, filters } = useSelector((state) => state.filterReducer);
  const dispatch = useDispatch();

  const handleValues = (e) => {
    let { name, value } = e.target;
    dispatch(updateFilterValues({ name, value }));
  };

  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Brands</h4>
      <div className="space-y-2">
        {brands[0] !== undefined &&
          (brands.length < 10 ? (
            brands.map((brand, i) => (
              <div key={i} className="flex items-center">
                <button
                  name="brand"
                  value={brand}
                  onClick={handleValues}
                  className={`w-5 h-5 border rounded-sm mr-3 flex items-center justify-center ${
                    filters.brand === brand
                      ? "border-[#d51243] bg-[#d51243]"
                      : "border-gray-300 hover:border-rose-400"
                  }`}
                >
                  {filters.brand === brand && (
                    <FiCheck className="text-white" size={14} />
                  )}
                </button>
                <span className="text-sm text-gray-700">{brand}</span>
              </div>
            ))
          ) : (
            <div className="relative w-full sm:w-auto order-2 sm:order-none">
              <select
                name="brand"
                value={filters.brand}
                onChange={handleValues}
                className="appearance-none  border border-rose-100 text-gray-900 py-2 pl-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent text-sm w-full"
              >
                <option value="">Select Brand</option>
                {brands.map((brand, i) => (
                  <option key={i} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CheckBrand;
