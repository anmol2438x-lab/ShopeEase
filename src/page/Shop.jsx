import React, { useEffect, useState } from "react";
import {
  ProductFilter,
  PageToHome,
  ProductList,
  Sorting,
  Loader,
  ErrorMessage,
} from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import { sortingProducts } from "../slice/filterReducer";
import { useOutletContext } from "react-router-dom";

function Shop() {
  const { sortingValue } = useSelector((state) => state.filterReducer);
  const dispatch = useDispatch();
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { isLoading, isError, error } = useOutletContext();

  useEffect(() => {
    dispatch(sortingProducts());
  }, [sortingValue]);

  return (
    <div className="container mx-auto pb-10">
      <PageToHome pageName={"Shop"} />
      <div className="relative lg:grid grid-cols-4  ">
        {/* FilterSection  */}
        <ProductFilter showMobileFilter={showMobileFilter} />

        {/* Products view */}
        <div className="w-full lg:col-span-3">
          {/* Product sort */}
          <Sorting
            setFilter={setShowMobileFilter}
            showFilter={showMobileFilter}
          />

          {/* Product Lists */}
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <ErrorMessage productErrorData={error} />
          ) : (
            <ProductList />
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
