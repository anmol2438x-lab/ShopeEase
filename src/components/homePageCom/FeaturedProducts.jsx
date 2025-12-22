import React from "react";
import { PaddingSection, ProductCard } from "../index";
import { useSelector } from "react-redux";
import Slider from "react-slick";

import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { NavLink } from "react-router-dom";

function FeaturedProducts() {
  const { allProducts } = useSelector((state) => state.filterReducer);

  const featuredItems = [...allProducts]
    ?.filter((item) => item.hasOwnProperty("brand"))
    .sort((a, b) => b.rating - a.rating);

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-1 top-1/2 md:right-6 md:-top-9 z-10 active:translate-y-1 cursor-pointer rounded-full bg-white bg-opacity-90 p-1.5 md:p-2 text-gray-800 shadow-lg hover:bg-[#D51243] hover:text-white transition-all duration-100"
      onClick={onClick}
      aria-label="Next slide"
    >
      <MdArrowForwardIos className="h-4 w-4 md:h-5 md:w-5" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute w-fit md:right-[4.5rem] top-1/2 md:-top-9 z-10 active:translate-y-1 cursor-pointer rounded-full bg-white bg-opacity-90 p-1.5 md:p-2 text-gray-800 shadow-lg hover:bg-[#D51243] hover:text-white transition-all duration-100"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <MdArrowBackIosNew className="h-4 w-4 md:h-5 md:w-5" />
    </div>
  );
  

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: true,
    swipe: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1300, // Medium screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="catSliderSection">
      <PaddingSection py={6}>
        <div className="heading">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Featured <span className="text-[#d51243]">Products</span>
          </h2>
        </div>
  
        {/* products section */}
        <div className="flex gap-6">
          
          {/* product list */}
          <div className="w-full lg:w-[75%]">
            <Slider {...settings}>
              {featuredItems.slice(0, 10).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </Slider>
          </div>
  
          {/* product banner */}
          <div className="hidden lg:block">
            <div className=" h-full flex justify-center rounded-md overflow-hidden">
              <NavLink to='/shop'>

              <img className="object-cover hover:scale-125 duration-300" src="/banners/01Banner.jpg" alt="" />
              </NavLink>
            </div>
          </div>
        </div>
      </PaddingSection>
    </div>
  );
  
}

export default FeaturedProducts;
