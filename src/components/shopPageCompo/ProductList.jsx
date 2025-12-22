import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ProductCard, NoProductsFound, ProductListCard } from "../index";
import { useSelector } from "react-redux";

function ProductList() {
  const { filterProducts, gridView } = useSelector(
    (state) => state.filterReducer
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(24);

  // calculate pagination
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;

  const totalPages = Math.ceil(filterProducts.length / postPerPage);

  const handlePage = (btn) => {
    if (btn === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (btn === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterProducts]);

  return (
    <div>
      {/* Product Count */}
      <div className="text-sm text-gray-600 order-3 sm:order-none w-full text-center sm:w-auto  ">
        We found{" "}
        <span className="font-medium text-gray-900">
          {filterProducts.length}
        </span>{" "}
        items for you!
      </div>

      {/* products card list  */}
      <ul className="relative flex flex-wrap space-x-1 py-6 md:p-10 gap-2 mx-auto justify-center items-center bg-white">
        {filterProducts.length === 0 && <NoProductsFound />}
        {filterProducts
          ?.slice(firstIndex, lastIndex)
          .map((product) =>
            gridView ? (
              <ProductCard key={product.id} product={product} />
            ) : (
              <ProductListCard key={product.id} product={product} />
            )
          )}
      </ul>

      {/* pagination */}
      {filterProducts.length > postPerPage && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          {/* Mobile view */}
          <div className="flex flex-1 items-center justify-between sm:hidden gap-2">
            <button
              className={`flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition-all ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50 hover:shadow-md"
              }`}
              onClick={() => handlePage("prev")}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <div className="flex items-center rounded-lg bg-gray-50 px-4 py-2.5 text-sm font-medium shadow-inner">
              <span className="font-semibold text-gray-900">{currentPage}</span>
              <span className="text-gray-500 mx-1">/</span>
              <span className="text-gray-500">{totalPages}</span>
            </div>

            <button
              className={`flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition-all ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50 hover:shadow-md"
              }`}
              onClick={() => handlePage("next")}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* Desktop view */}
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium text-gray-900">
                  {firstIndex === 0 ? 1 : firstIndex}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-900">
                  {lastIndex > filterProducts.length
                    ? filterProducts.length
                    : lastIndex}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900">
                  {filterProducts.length}
                </span>{" "}
                results
              </p>
            </div>

            <div className="flex items-center gap-4">
              <nav className="isolate inline-flex -space-x-px rounded-lg shadow-sm">
                <button
                  className={`relative inline-flex h-10 items-center rounded-l-lg px-3 text-gray-700 transition-all ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50"
                  } border border-gray-200 focus:z-20`}
                  onClick={() => handlePage("prev")}
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">Previous</span>
                  <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="flex h-10 items-center justify-center border-t border-b border-gray-200 bg-white px-4">
                  <span className="font-semibold text-gray-900">
                    {currentPage}
                  </span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-500">{totalPages}</span>
                </div>

                <button
                  className={`relative inline-flex h-10 items-center rounded-r-lg px-3 text-gray-700 transition-all ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50"
                  } border border-gray-200 focus:z-20`}
                  onClick={() => handlePage("next")}
                  disabled={currentPage === totalPages}
                >
                  <span className="sr-only">Next</span>
                  <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
