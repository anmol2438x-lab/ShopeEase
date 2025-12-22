import React, { useState } from "react";
import { SlEarphonesAlt } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { RiColorFilterAiFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterValues } from "../../slice/filterReducer";

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {categories} = useSelector(state => state.filterReducer)
  const [opencategory, setOpencategory] = useState(false)

  const handleCatClick = (category) => {
    setOpencategory(false)
    dispatch(updateFilterValues({name: 'category', value: category}))
    navigate('/shop')
  }
  

  // Main navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop", isNew: true },
    { name: "Contact Us", path: "/contact" },
  ];


  return (
    <header
      className={`hidden lg:block bg-white border-b border-gray-100 `}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main navigation bar */}
        <nav className="flex items-center justify-between py-3 h-16">
          {/* category  selction*/}
          <div className="flex items-center relative w-[300px]">
            <div className="flex items-center gap-2 text-white text-sm bg-[#d51243] hover:bg-[#bf0f3d] transition-all duration-300 ease-in-out rounded-md cursor-pointer py-2 px-3" onClick={() => setOpencategory(!opencategory)}>
              <RiColorFilterAiFill className="text-lg" />
              <span className="font-semibold">Browse All Categories</span>
              <IoIosArrowDown className={`transition-transform duration-300 ${opencategory ? "rotate-180" : ""}`} />
            </div>

            {opencategory && (
              <div className="absolute top-10 z-20 bg-white rounded-lg shadow-lg py-3 px-4 w-[300px] max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#d51243] scrollbar-track-gray-200 animate-fade-in">
                <ul className="space-y-2">
                  {categories?.slice(1).map((item, i) => (
                    <li key={i} className="text-gray-700 hover:text-[#d51243] hover:font-semibold cursor-pointer transition-all duration-200 px-2 py-1 rounded-md hover:bg-gray-100" onClick={() => handleCatClick(item)}>
                      {item.charAt(0).toLocaleUpperCase() + item.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>



          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 pr-9">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative py-2 hover:text-[#d51243] text-base font-medium ${
                    isActive ? "text-[#d51243]" : "text-[#000000e6]"
                  }`
                }
              >
                {item.name}
                {item.isNew && (
                  <span className="absolute -top-3 -right-5 bg-[#d51243] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full animate-pulse">
                    NEW
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Contact Button - Desktop */}
          <div className="hidden md:flex items-center text-sm">
            <NavLink
              to="tel:01234567890"
              className="flex items-center gap-4 text-[#d51243] px-4 py-2 rounded-lg"
            >
              <SlEarphonesAlt className="text-[24px] text-[#212529]" />
              <div>
              <h3 className="text-[16px] font-semibold">01-234-567-890</h3>
              <p className="text-[13px] text-[#000c]">24/7 Support Center</p>

              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
