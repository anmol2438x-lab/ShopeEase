import React, { memo, useCallback, useEffect, useState } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiX,
  FiMenu,
  FiPhone,
  FiPackage
} from "react-icons/fi";

import {SearchAndLocation} from './index';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters, resetFilters, updateFilterValues } from "../../slice/filterReducer";
import SearchSuggetion from "./SearchSuggetion";

const HeaderMiddle = ({ mobileMenu }) => {
  // local states
  const { mobileMenuOpen, setMobileMenuOpen } = mobileMenu;
  const [searchOpen, setSearchOpen] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [debounceValue, setDebounceValue] = useState('')

  // store states
  const dispatch = useDispatch()
  const whislists = useSelector(state => state.wishlistReducer.whislistItems)
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  const orders = useSelector(state => state.orderReducer.orders || []) // Assuming you have an orderReducer
  const { filters } = useSelector((state) => state.filterReducer);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const orderCount = orders.length

  // handle search suggestion or search btn click
  const handleSearchClick = (title) => {
    if(title){
      setSearchValue(title)
    }
    dispatch(updateFilterValues({name: 'category', value: 'all'}))
    dispatch(updateFilterValues({name: 'search', value: searchValue}))
    setShowSuggestion(false)
  }

  useEffect(() => {
    setSearchValue('')
  }, [filters.category])

  // Debounce method
  const debounce = (func, delay) => {
    let timer;
    return (...arg) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func(...arg)
      }, delay)
    }
  }

  const debounceSugg = (value) => {
    setDebounceValue(value)   
  }

  const searchWithDebounce = useCallback(debounce(debounceSugg, 500), [])

  useEffect(() => {
    searchWithDebounce(searchValue)
  }, [searchValue])

  // call applyFilter action creater
  useEffect(() => {
    dispatch(applyFilters())
  }, [filters])
  
  //show search suggestions
  useEffect(() => {
    if (searchValue) {
      setShowSuggestion(true);
    }
  }, [searchValue, setShowSuggestion]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop", isNew: true },
    { name: "Orders", path: "/orders" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="bg-[#ffffff] shadow-sm py-3 sticky top-0 z-40">
      <div className="mx-auto px-6">
        {/* Mobile Search Bar (shown only on mobile when activated) */}
        {searchOpen && (
          <div className="md:hidden mb-3 relative">
            <input
              type="text"
              name="search"
              autoComplete="off"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="w-full px-5 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d51243] text-sm"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <FiX />
            </button>
          </div>
        )}

        <nav className="relative flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <div className="logo min-w-[100px] md:min-w-[120px] flex-shrink-0">           
            <NavLink to="/" className="font-bold text-xl text-[#d51243]">
              ShopEase
            </NavLink>
          </div>

          {/* Search and Location Form */}
          <SearchAndLocation 
            searchValue={searchValue} 
            setSearchValue={setSearchValue} 
            handleSearchClick={handleSearchClick}
          />

          {/* Header Right Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile Search Button */}
            <button
              type="button"
              className="md:hidden p-1 text-gray-600 hover:text-[#d51243] transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FiSearch className="text-xl" />
            </button>

            {/* Wishlist */}
            <NavLink
              to="/wishlist"
              className="p-1 md:p-2 flex items-center gap-1 text-gray-600 hover:text-[#d51243] transition-colors relative"
            >
              <FiHeart className="text-lg md:text-xl" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center rounded-full bg-[#d51243] text-white text-[8px] md:text-[10px] font-medium">
                {whislists.length}
              </span>
              <span className="hidden lg:inline-block ml-1 text-sm font-medium">
                Wishlist
              </span>
            </NavLink>

            {/* Orders */}
            <NavLink
              to="/orders"
              className="p-1 md:p-2 flex items-center gap-1 text-gray-600 hover:text-[#d51243] transition-colors relative"
            >
              <FiPackage className="text-lg md:text-xl" />
              {orderCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center rounded-full bg-[#d51243] text-white text-[8px] md:text-[10px] font-medium">
                  {orderCount}
                </span>
              )}
              <span className="hidden lg:inline-block ml-1 text-sm font-medium">
                Orders
              </span>
            </NavLink>

            {/* Cart */}
            <NavLink
              to="/cart"
              className="p-1 md:p-2 flex items-center gap-1 text-gray-600 hover:text-[#d51243] transition-colors relative"
            >
              <FiShoppingCart className="text-lg md:text-xl" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center rounded-full bg-[#d51243] text-white text-[8px] md:text-[10px] font-medium">
                {cartCount} 
              </span>
              <span className="hidden lg:inline-block ml-1 text-sm font-medium">
                Cart
              </span>
            </NavLink>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`md:hidden sticky inset-0 top-0 bg-white z-40 overflow-y-auto transition-all duration-300 ease-in-out h-fit ${
            mobileMenuOpen ? "opacity-100 translate-y-0 block" : "opacity-0 -translate-y-full pointer-events-none hidden"
          }`}
        >
          <div className="container mx-auto py-6">
            {/* Mobile Navigation */}
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-3 px-4 rounded-lg ${
                        isActive
                          ? "bg-[#d51243]/10 text-[#d51243] font-medium"
                          : "hover:bg-gray-50 text-gray-700"
                      }`
                    }
                  >
                    <span>{item.name}</span>
                    {item.isNew && (
                      <span className="bg-[#d51243] text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Contact Button - Mobile */}
            <div className="mt-8">
              <NavLink
                to="tel:01234567890"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#d51243] text-white px-4 py-3 rounded-lg hover:bg-[#b01036] transition-colors w-full"
              >
                <FiPhone className="text-lg" />
                <span>Call Us: 01-234-567-890</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* search suggestions */}
        {showSuggestion && debounceValue && <SearchSuggetion handleSearchClick={handleSearchClick} searchValue={debounceValue}/>} 
      </div>
    </header>
  );
};

export default HeaderMiddle;