import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  HeroSection,
  CatSlider,
  ProductsSwitchTab,
  FeaturedProducts,
  BannerSection,
  ProductsWrapper,
  ErrorMessage,
  Loader,
} from "../components/index";
import { useOutletContext } from "react-router-dom";

function Home() {
  const allProducts = useSelector((state) => state.productsReducer.allProducts);
  const { isLoading, isError, error } = useOutletContext();

  const gadgets = useMemo(() => {
    return allProducts?.filter(
      (item) => item.category === "mobile-accessories"
    );
  }, [allProducts]);

  return (
    <div>
      <HeroSection />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage productErrorData={error} />
      ) : (

        <>
          <CatSlider />
          <ProductsSwitchTab />
          <BannerSection />
          <FeaturedProducts />
          <ProductsWrapper title={{ first: "Tech", last: "Gadgets" }} products={gadgets} />
        </>
      )}
    </div>
  );
}

export default Home;
