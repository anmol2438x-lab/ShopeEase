import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateFilterValues } from "../../slice/filterReducer";

function CatCard({ category }) {
  const dispatch = useDispatch()
  const { allProducts } = useSelector((state) => state.filterReducer);
  const categoryiMG = allProducts.filter(item => item.category === category)

  const handleCatClick = () => {
    dispatch(updateFilterValues({name: 'category', value: category}))
  }
 

  return (
    <div className="pr-4 py-3 w-44 outline-none">
      <NavLink to="/shop">
        <div className="flex flex-col items-center justify-center group cursor-pointer" onClick={handleCatClick}>
          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-rose-50 overflow-hidden rounded-full border-2 border-transparent group-hover:border-[#d51243] group-hover:shadow-lg transition-all duration-300 p-1">
            <img
              className="object-cover w-full h-full rounded-full group-hover:scale-110 transition-all duration-300"
              src={categoryiMG[0].thumbnail}
              alt={category}
              loading="lazy"
            />
          </div>
          
          <h3 className="mt-3 text-sm md:text-base font-medium text-gray-700 group-hover:text-[#d51243] text-center">
            {category.charAt(0).toLocaleUpperCase() +
              category.slice(1).toLocaleLowerCase()}
          </h3>
        </div>
      </NavLink>
    </div>
  );
}

export default CatCard;
