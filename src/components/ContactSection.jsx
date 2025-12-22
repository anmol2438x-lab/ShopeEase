import React from "react";
import {
  FiPhoneCall,
  FiMail,
  FiMapPin,
  FiHeadphones,
  FiNavigation,
} from "react-icons/fi";

const ContactSection = () => {
  const starClass = "text-[#d51243] text-lg leading-none";
  const lableClass =
    "flex items-center gap-1 text-sm font-medium text-gray-900 mb-2";
  const inputFildClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d51243] focus:border-transparent transition-all";

  return (
    <section className="contact py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="border border-gray-200 rounded-xl p-6 lg:p-10">
              <form action="https://formspree.io/f/meoarwdb" method="POST">
                <h6 className="text-xl font-semibold text-gray-900 mb-8">
                  Make Custom Request
                </h6>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className={lableClass}>
                      Full Name <span className={starClass}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="FullName"
                      className={inputFildClass}
                      placeholder="Full name"
                      autoComplete="off"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className={lableClass}>
                      Email Address <span className={starClass}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="Email"
                      className={inputFildClass}
                      placeholder="Email address"
                      autoComplete="off"
                      required
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className={lableClass}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="Phone"
                      className={inputFildClass}
                      placeholder="Phone Number"
                      autoComplete="off"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className={lableClass}>
                      Subject <span className={starClass}>*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="Subject"
                      className={inputFildClass}
                      placeholder="Subject"
                      autoComplete="off"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={lableClass}>
                      Message <span className={starClass}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="Message"
                      rows="4"
                      className={inputFildClass}
                      placeholder="Type your message"
                      autoComplete="off"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="sm:col-span-2 mt-4">
                    <button
                      type="submit"
                      className="bg-[#d51243] hover:bg-[#b30f3a] text-white font-medium py-3 px-8 rounded-lg transition-colors"
                    >
                      Get a Quote
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:w-1/3">
            <div className="border border-gray-200 rounded-xl p-6 lg:p-10 mb-6">
              <h6 className="text-xl font-semibold text-gray-900 mb-12">
                Get In Touch
              </h6>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-[#d51243] text-xl flex-shrink-0">
                  <FiPhoneCall />
                </div>
                <a
                  href="tel:+00987654012"
                  className="text-gray-900 hover:text-[#d51243] transition-colors"
                >
                  +00 987 654 012
                </a>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-[#d51243] text-xl flex-shrink-0">
                  <FiMail />
                </div>
                <a
                  href="mailto:support24@shopease.com"
                  className="text-gray-900 hover:text-[#d51243] transition-colors"
                >
                  support24@shopease.com
                </a>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-[#d51243] text-xl flex-shrink-0">
                  <FiMapPin />
                </div>
                <span className="text-gray-900">
                  example Lane, example park, example, India
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="bg-gray-700 hover:bg-[#d51243] rounded-lg p-3 px-4 flex items-center justify-between flex-grow transition-colors"
              >
                <span className="text-white font-medium">
                  Get Support On Call
                </span>
                <span className="w-9 h-9 bg-[#d51243] rounded-lg flex items-center justify-center text-white">
                  <FiHeadphones />
                </span>
              </a>

              <a
                href="/contact"
                className="bg-gray-700 hover:bg-[#d51243] rounded-lg p-3 px-4 flex items-center justify-between flex-grow transition-colors"
              >
                <span className="text-white font-medium">Get Direction</span>
                <span className="w-9 h-9 bg-[#d51243] rounded-lg flex items-center justify-center text-white">
                  <FiNavigation />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
