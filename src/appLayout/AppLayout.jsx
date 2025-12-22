import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MegaFooter from "./footer/MegaFooter";
import MegaHeader from "./header/MegaHeader";
import { ErrorMessage, Loader } from "../components";
import { getAllProducts } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { addAllProducts } from "../slice/productsReducer";
import {
  loadCategories_Brand,
  loadFilterProducts,
} from "../slice/filterReducer";

function AppLayout() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productsReducer.allProducts);

  // fetch all products data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    select: (data) => {
      return data.products.map((item) => ({ ...item, price: item.price * 86 }));
    },
    staleTime: 1000 * 60,
  });

  // set all Products data on states
  useEffect(() => {
    if (data) {
      if (allProducts.length === 0) {
        dispatch(addAllProducts(data));
        dispatch(loadFilterProducts(data));
        dispatch(loadCategories_Brand());
      }
    }
  }, [data]);

  return (
    <>
      <MegaHeader />
      <Suspense>
        <Outlet
          context={{
            isLoading,
            isError,
            error,
          }}
        />
      </Suspense>
      <MegaFooter />
    </>
  );
}

export default AppLayout;
