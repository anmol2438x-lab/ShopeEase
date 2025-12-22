import React from "react";
import { useSelector } from "react-redux";
// import Slider from "react-slick";
import { CatCard, PaddingSection } from "../index";

// category carausel with react-silk
// function FeaturedCategories() {

//   const {categories} = useSelector(state => state.filterReducer)

//   const settings = {
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 1000 * 2.2,
//     slidesToShow: 8,
//     slidesToScroll: 1,
//     pauseOnHover: true,
//     arrows: true,
//     responsive: [
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: 7,
//         }
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 6,
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 5,
//           arrows: false,
//         }
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 4,
//           arrows: false,
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 3,
//           arrows: false,
//         }
//       }
//     ]
//   };

//   return (
//     <div className="catSliderSection">
//       <div className="mx-2 md:px-11">
//         <h2 className="text-xl font-semibold text-gray-900 mb-3 ">
//           Featured <span className="text-[#d51243]">Categories</span>
//         </h2>

//         <div className="pl-2">
//           <Slider {...settings}>
//             {categories.slice(1).map((category, i) => (
//               <CatCard key={i} category={category}/>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FeaturedCategories;

// category carausel without react-silk and simple way



function simpleCatSlider() {
  const { categories } = useSelector((state) => state.filterReducer);

  return (
    <div className="catSliderSection">
      <PaddingSection>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Featured <span className="text-[#d51243]">Categories</span>
        </h2>

        <div className="pl-2">
          <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x hide-scrollbar">
            {categories.slice(1).map((category, i) => (
              <CatCard key={i} category={category} />
            ))}
          </div>
        </div>
      </PaddingSection>
    </div>
  );
}

export default simpleCatSlider;
