import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

import { NavLink, useParams } from "react-router-dom";

import { getCategoryProducts, getSingleProduct } from "../api/api";

// components
import {
  Loader,
  ProductTab,
  ErrorMessage,
  ProductNotFound,
  NavPagination,
  ProductDataInfo,
  ProductCard,
} from "../components/index";

import { useDispatch, useSelector } from "react-redux";
import { addRecentlyViewedPro } from "../slice/productsReducer";

import { setRecentlyViewed } from "../localStorage/handleStorage";
import { updateFilterValues } from "../slice/filterReducer";
import Slider from "react-slick";
import RelatedProducts from "../components/singleProductPageParts/RelatedProducts";
import PaddingSection from "../components/PaddingSection";

const SingleProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const recentlyViewed = useSelector(
    (state) => state.productsReducer.recentlyViewedPro
  );

  // Fetch single product data
  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
    error: productErrorData,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
    select: (data) => ({
      ...data,
      price: data.price * 86, // Convert to INR
      originalPrice: data.price, // original USD
    }),
  });

  // Fetch category products
  const {
    data: categoryProducts,
    isLoading: categoryProductsLoading,
    isError: categoryProductsError,
  } = useQuery({
    queryKey: ["categoryProducts", productData?.category],
    queryFn: () => getCategoryProducts(productData?.category),
    select: (data) => {
      return data.map((item) => ({ ...item, price: item.price * 86 }));
    },
    enabled: !!productData?.category,
  });

  // Handle recently viewed products
  useEffect(() => {
    if (productData) {
      const updated = [
        productData,
        ...recentlyViewed.filter((item) => item.id !== productData.id),
      ].slice(0, 10);
      setRecentlyViewed(updated);
      dispatch(addRecentlyViewedPro(updated));
    }
  }, [productData]);

  // Loading state
  if (productLoading || categoryProductsLoading) return <Loader />;

  // Error state
  if (productError || categoryProductsError)
    return <ErrorMessage productErrorData={productErrorData} />;

  // Product not found
  if (!productData) return <ProductNotFound />;

  return (
    <div className="bg-white min-h-screen">
      <PaddingSection py={6}>
        {/* Breadcrumb */}
        <NavPagination productData={productData} />

        {/* prodect data  */}
        <ProductDataInfo productData={productData} />

        {/* Product Tabs */}
        <ProductTab productData={productData} />

        {/* Related Products */}
        {categoryProducts && categoryProducts.length > 0 && (
          <RelatedProducts
            title={"You May Also Like"}
            products={categoryProducts}
          />
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-12 overflow-hidden">
            {recentlyViewed.length > 5 ? (
              <RelatedProducts
                title={"Recently Viewed"}
                products={recentlyViewed.filter((item) => item.id !== productData.id).slice(0, 10)}
              />
            ) : (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>

                <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x hide-scrollbar">
                  {recentlyViewed.filter((item) => item.id !== productData.id).map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </PaddingSection>
    </div>
  );
};

export default SingleProduct;
