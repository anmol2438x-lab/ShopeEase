import React from "react";
import { 
  FiTruck, 
  FiHeart, 
  FiCreditCard, 
  FiMessageSquare 
} from "react-icons/fi";

const ShippingBenefits = () => {
  const benefits = [
    {
      icon: <FiTruck className="text-2xl" />,
      title: "Free Shipping",
      description: "Free shipping all over the India"
    },
    {
      icon: <FiHeart className="text-2xl" />,
      title: "100% Satisfaction",
      description: "30-day return policy"
    },
    {
      icon: <FiCreditCard className="text-2xl" />,
      title: "Secure Payments",
      description: "All cards accepted"
    },
    {
      icon: <FiMessageSquare className="text-2xl" />,
      title: "24/7 Support",
      description: "Dedicated support"
    }
  ];

  return (
    <section className="pb-12 bg-white" id="shipping">
      <div className="container mx-auto px-4">
        <div className="flex gap-3 w-full overflow-x-auto hide-scrollbar">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-center min-w-64 w-full gap-4 p-6 rounded-xl bg-gray-50 transition-colors duration-200 group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#d51243] text-white flex-shrink-0 group-hover:-translate-y-1 transition-all">
                {benefit.icon}
              </div>
              <div>
                <h6 className="font-medium text-gray-900 mb-1">
                  {benefit.title}
                </h6>
                <p className="text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShippingBenefits;