import React from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" pb-24 pt-7 relative">
      {/* Background image */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-100 to-transparent z-0"></div>

      <div className="container mx-auto px-4 xl:px-0 relative z-10">
        <div className="flex justify-around md:justify-between flex-wrap gap-8">
          {/* Column 1 - About */}
          <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
            <div className="mb-6">
              <NavLink to="/" className="text-2xl font-bold text-[#d51243]">
                ShopEase
              </NavLink>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              We're Grocery Shop, an innovative team of food suppliers.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#d51243] text-white mt-1 flex-shrink-0">
                  <FiMapPin className="text-sm" />
                </div>
                <p className="text-gray-700">
                  789 example Lane, example park, example, India
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#d51243] text-white mt-1 flex-shrink-0">
                  <FiPhone className="text-sm" />
                </div>
                <div className="flex flex-wrap items-center gap-x-2">
                  <NavLink
                    to="tel:+00123456789"
                    className="text-gray-700 hover:text-[#d51243]"
                  >
                    +00 123 456 789
                  </NavLink>
                  <span className="text-[#d51243]">or</span>
                  <NavLink
                    to="tel:+00987654012"
                    className="text-gray-700 hover:text-[#d51243]"
                  >
                    +00 987 654 012
                  </NavLink>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#d51243] text-white mt-1 flex-shrink-0">
                  <FiMail className="text-sm" />
                </div>
                <NavLink
                  to="mailto:support24@marketpro.com"
                  className="text-gray-700 hover:text-[#d51243]"
                >
                  support24@shopease.com
                </NavLink>
              </div>
            </div>
          </div>

          {/* Column 2 - Information */}

          <InfoCol
            title={"Information"}
            data={[
              "Become a Vendor",
              "Affiliate Program",
              "Privacy Policy",
              "Our Suppliers",
              "Extended Plan",
              "Community",
            ]}
          />

          {/* Column 3 - Customer Support */}

          <InfoCol
            title={"Customer Support"}
            data={[
              "Help Center",
              "Contact Us",
              "Report Abuse",
              "Submit a Dispute",
              "Policies & Rules",
              "Online Shopping",
            ]}
          />

          {/* Column 4 - My Account */}
          <InfoCol
            title={"My Account"}
            data={[
              "My Account",
              "Order History",
              "Shopping Cart",
              "Compare",
              "Help Ticket",
              "Wishlist",
            ]}
          />

          {/* Column 5 - Daily Groceries */}
          <InfoCol
            title={"Daily Groceries"}
            data={[
              "Dairy & Eggs",
              "Meat & Seafood",
              "Breakfast Food",
              "Household Supplies",
              "Bread & Bakery",
              "Pantry Staples",
            ]}
          />

          {/* Column 6 - App & Social */}
          <div className="">
            <h6 className="text-lg font-semibold text-gray-900 mb-4">
              Shop on The Go
            </h6>
            <p className="text-gray-600 mb-6">
              ShopEase App is available. Get it now
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <NavLink
                to="#"
                className=" h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
              >
                <img src="/app.jpg" alt="app-store" />
              </NavLink>
              <NavLink
                to="#"
                className=" h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
              >
                <img src="/google.jpg" alt="google-playStore" />
              </NavLink>
            </div>

            <div className="flex gap-4">
              {[
                { icon: <FiFacebook />, name: "Facebook" },
                { icon: <FiTwitter />, name: "Twitter" },
                { icon: <FiInstagram />, name: "Instagram" },
                { icon: <FiLinkedin />, name: "LinkedIn" },
              ].map((social, index) => (
                <NavLink
                  key={index}
                  to="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-[#d51243] hover:bg-[#d51243] hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

function InfoCol({ title, data }) {
  return (
    <div className="pr-3">
      <h6 className="text-lg font-semibold text-gray-900 mb-4">{title}</h6>
      <ul className="space-y-3">
        {data.map((item, index) => (
          <li key={index} className='"text-gray-600 hover:text-[#d51243] hover:translate-x-1 duration-200 transition-all"'>
            <NavLink to="#">{item}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
