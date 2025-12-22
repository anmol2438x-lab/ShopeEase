import React from "react";
import { FiSend } from "react-icons/fi";
import { PaddingSection } from "../../components/index";

const NewsletterSection = () => {
  return (
    <PaddingSection py={12}>
      <div className="container mx-auto relative">
        <div className="relative flex flex-col lg:flex-row items-center bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl shadow-sm overflow-hidden">
          
          {/* Background image for small screens */}
          <div className="absolute inset-0 bg-[url('/news.svg')] bg-cover bg-center opacity-20 lg:hidden"></div>

          {/* Text Content */}
          <div className="relative w-full lg:w-1/2 p-8 sm:p-10 md:p-12 lg:p-14 z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#d51243] via-[#ff9800] to-[#00bcd4] drop-shadow-lg animate-gradient">
              Stay home & get your daily <br className="hidden sm:block" />
              needs from our shop
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Start Your Daily Shopping with <span className="text-[#d51243] text-xl">ShopEase</span>
            </p>

            {/* Newsletter Form */}
            <form action="https://formspree.io/f/mldjzbvn" method="POST" className="w-full max-w-2xl">
              <div className="relative w-full">
                <input
                  type="email"
                  name="emailSubscribe"
                  autoComplete="off"
                  placeholder="Your email address"
                  className="w-full py-3 sm:py-4 pl-4 pr-24 rounded-full border focus:border-[#d51243] focus:ring-2 focus:ring-[#d51243]/30 outline-none transition-all bg-white/90"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-[#d51243] text-white px-5 sm:px-6 py-2 sm:py-3 font-semibold rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-[1.05] shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Subscribe
                  <span className="animate-bounce">
                    <FiSend className="text-lg sm:text-xl" />
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Image for large screens */}
          <div className="w-full lg:w-1/2 h-full hidden lg:flex justify-center items-end">
            <img
              src="/news.svg"
              alt="Newsletter"
              className="w-full h-auto max-h-80 sm:max-h-96 object-contain object-center lg:object-bottom"
            />
          </div>

        </div>
      </div>
    </PaddingSection>
  );
};

export default NewsletterSection;
