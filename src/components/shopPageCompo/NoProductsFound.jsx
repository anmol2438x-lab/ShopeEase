import { FiFrown, FiFilter, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "../../slice/filterReducer";

const NoProductsFound = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filterReducer);

  const activeFilters = Object.entries(filters)
    .filter(
      ([key, value]) =>
        value !== null &&
        value !== "" &&
        value !== "all" &&
        !(Array.isArray(value) && value.length === 0)
    )
    .map(([key]) => key);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <FiFrown className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-medium text-gray-700 mb-2">
        No Products Found
      </h3>

      <p className="text-gray-500 mb-6 max-w-md">
        {activeFilters.length > 0
          ? "We couldn't find any products matching your filters."
          : "No products are currently available in this category."}
      </p>

      {activeFilters.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                <FiFilter className="mr-1" size={12} />
                {filter}: {filters[filter]}
              </span>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetFilters())}
            className="px-6 py-2 bg-[#d51243] hover:bg-rose-700 text-white rounded-lg font-medium transition-colors flex items-center"
          >
            <FiX className="mr-2" />
            Clear All Filters
          </button>
        </>
      )}
    </div>
  );
};

export default NoProductsFound;
