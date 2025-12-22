import React, { useState } from "react";
import Slider from "react-slick";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-2 md:right-6 top-1/2 z-10 active:translate-y-1 cursor-pointer rounded-full bg-white bg-opacity-90 p-1.5 md:p-2 text-gray-800 shadow-lg hover:bg-[#D51243] hover:text-white transition-all duration-100"
      onClick={onClick}
      aria-label="Next slide"
    >
      <MdArrowForwardIos className="h-4 w-4 md:h-5 md:w-5" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-2 md:left-6 top-1/2 z-10 active:translate-y-1 cursor-pointer rounded-full bg-white bg-opacity-90 p-1.5 md:p-2 text-gray-800 shadow-lg hover:bg-[#D51243] hover:text-white transition-all duration-100"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <MdArrowBackIosNew className="h-4 w-4 md:h-5 md:w-5" />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (index) => setActiveSlide(index),
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "20px", width: "100%" }}>
        <ul style={{ margin: "0", padding: "0", textAlign: "center" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: i === activeSlide ? "#D51243" : "#CCCCCC",
          margin: "0 5px",
          cursor: "pointer",
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  const slides = [
    {
      id: 1,
      img: "/homeBanner/homeBanner1.webp",
      alt: "Special offer on summer collection",
    },
    {
      id: 2,
      img: "/homeBanner/homeBanner2.webp",
      alt: "New arrivals in electronics",
    },
    {
      id: 3,
      img: "/homeBanner/homeBanner3.webp",
      alt: "Home decor specials",
    },
    {
      id: 4,
      img: "/homeBanner/homeBanner4.webp",
      alt: "Fashion trends for this season",
    },
    {
      id: 5,
      img: "/homeBanner/homeBanner5.webp",
      alt: "Special deals on beauty products",
    },
  ];

  return (
    <section className="home-slider pb-4 md:py-5">
      <div className="slider relative md:px-11">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={slide.id} className="relative focus:outline-none">
              <div className="md:rounded-3xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={slide.img}
                  alt={slide.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchpriority={index === 0 ? "high" : "low"}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HeroSection;
