import React from "react";
import { PaddingSection } from "../index";
import { NavLink } from "react-router-dom";

function BannerSection() {
  const banners = [
    {
      id: 1,
      img: "/banners/banner1.webp",
      alt: "Big promotion super crazy sale",
    },
    {
      id: 2,
      img: "/banners/banner2.webp",
      alt: "Sale upto 50% off",
    },
    {
      id: 3,
      img: "/banners/banner3.webp",
      alt: "Mega sale 75% discount",
    },
    {
      id: 4,
      img: "/banners/banner4.webp",
      alt: "One sale, Many things",
    },
  ];
  return (
    <PaddingSection>
      {/* banners section */}
      <NavLink to='/shop'>
        <div className="banners">
          <div className=" flex gap-3 lg:justify-center overflow-x-auto hide-scrollbar">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className=" rounded-xl overflow-hidden min-w-48 max-w-96"
              >
                <img
                  className="w-full object-cover hover:scale-125 transition-all duration-300"
                  src={banner.img}
                  alt={banner.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </NavLink>
    </PaddingSection>
  );
}

export default BannerSection;
