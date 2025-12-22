import React from "react";
import ProductCard from "../ProductCard";
import Slider from "react-slick";

import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { updateFilterValues } from "../../slice/filterReducer";
import { useDispatch } from "react-redux";

function RelatedProducts({title, products}) {
  const dispatch = useDispatch();


  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-2 md:right-6 top-1/2 z-10 translate-y-[-50%] cursor-pointer rounded-full bg-white bg-opacity-90 p-1.5 md:p-2 text-gray-800 shadow-lg hover:bg-[#D51243] hover:text-white transition-all duration-200"
      onClick={onClick}
      aria-label="Next slide"
    >
      <MdArrowForwardIos className="h-5 w-5" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-2 md:left-6 top-1/2 z-10 translate-y-[-50%] cursor-pointer rounded-full bg-white bg-opacity-90 p-1.5 md:p-2 text-gray-800 shadow-lg hover:bg-[#D51243] hover:text-white transition-all duration-200"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <MdArrowBackIosNew className="h-5 w-5" />
    </div>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: true,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1400, // Large desktops
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200, // Medium desktops & laptops
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992, // Tablets & smaller laptops
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Tablets & large phones
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 476, // Small phones
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="gadgets-section">
        {/* heading */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {title !== 'Recently Viewed' &&  <NavLink
            to="/shop"
            onClick={() =>
              dispatch(
                updateFilterValues({
                  name: "category",
                  value: productData.category,
                })
              )
            }
            className="text-[#d51243] hover:underline"
          >
            View All
          </NavLink>}
        </div>

        {/* Product List */}
        <div className="w-full">
          <Slider {...settings}>
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </Slider>
        </div>
    </section>
  );
}

export default RelatedProducts;
