import React, {  useState } from "react";
import { FiUser, FiHeadphones, FiMessageSquare } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const HeaderTop = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const links = [
    { text: "Become A Seller", path: "#" },
    { text: "About us", path: "#" },
    { text: "Free Delivery", path: "#" },
    { text: "Returns Policy", path: "#" },
  ];

  const helpCenterItems = [
    { icon: <FiHeadphones />, text: "Call Center", path: '#'},
    { icon: <FiMessageSquare />, text: "Live Chat", path: '#'},
  ];

  const languages = [
    { flag: "🇺🇸", name: "English" },
    { flag: "🇯🇵", name: "Japan" },
    { flag: "🇫🇷", name: "French" },
    { flag: "🇩🇪", name: "Germany" },
    { flag: "🇧🇩", name: "Bangladesh" },
    { flag: "🇰🇷", name: "South Korea" },
  ];

  const currencies = [
    { flag: "🇺🇸", name: "USD" },
    { flag: "🇯🇵", name: "Yen" },
    { flag: "🇫🇷", name: "Franc" },
    { flag: "🇪🇺", name: "EURO" },
    { flag: "🇧🇩", name: "BDT" },
    { flag: "🇰🇷", name: "WON" },
  ];


  return (
    <div className="hidden sm:block bg-[#f3eee7] w-full">
      <div className="mx-auto px-6">
        <div className="flex justify-between items-center flex-wrap gap-8">
          {/* Left Links - Hidden on mobile */}
          <ul className="hidden lg:flex items-center flex-wrap">
            {links.map((link, index) => (
              <li
                key={index}
                className={`border-r border-[#ffffff4d]  pr-4 last:border-r-0`}
              >
                <NavLink
                  to={link.href}
                  className="text-black text-sm hover:underline"
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <ul className="flex items-center flex-wrap">
            {/* Help Center Dropdown */}
            <li
              className="relative group border-r border-[#ffffff4d] px-4"
              onMouseEnter={() => toggleDropdown("help")}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <button className="text-black text-sm py-2 flex items-center">
                Help Center
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    activeDropdown === "help" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === "help" && (
                <ul className="absolute left-0  w-48 bg-white rounded-md shadow-lg z-50 py-2 max-h-60 overflow-y-auto">
                  {helpCenterItems.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.path}
                        className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 text-xs py-2 px-4"
                      >
                        <span className="text-sm">{item.icon}</span>
                        {item.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Language Dropdown */}
            <li
              className="relative group border-r border-[#ffffff4d] px-4"
              onMouseEnter={() => toggleDropdown("language")}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <button className="text-black text-sm py-2 flex items-center">
                Eng
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    activeDropdown === "language" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === "language" && (
                <ul className="absolute left-0 w-48 bg-white rounded-md shadow-lg z-50 py-2 max-h-60 overflow-y-auto">
                  {languages.map((language, index) => (
                    <li key={index}>
                      <NavLink
                        to="#"
                        className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 text-xs py-2 px-4"
                      >
                        <span className="text-sm">{language.flag}</span>
                        {language.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Currency Dropdown */}
            <li
              className="relative group border-r border-[#ffffff4d] px-4"
              onMouseEnter={() => toggleDropdown("currency")}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <button className="text-black text-sm py-2 flex items-center">
                USD
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    activeDropdown === "currency" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === "currency" && (
                <ul className="absolute left-0 w-48 bg-white rounded-md shadow-lg z-50 py-2 max-h-60 overflow-y-auto">
                  {currencies.map((currency, index) => (
                    <li key={index}>
                      <NavLink
                        to="#"
                        className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 text-xs py-2 px-4"
                      >
                        <span className="text-sm">{currency.flag}</span>
                        {currency.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* My Account */}
            <li className="border-r border-[#ffffff4d] px-4 last:border-r-0">
              <NavLink
                to="/"
                className="text-black text-sm py-2 flex items-center gap-2 hover:underline"
              >
                <span className="text-md">
                  <FiUser />
                </span>
                My Account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;