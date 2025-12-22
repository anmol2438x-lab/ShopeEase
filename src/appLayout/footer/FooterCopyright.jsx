import React from "react";

const FooterCopyright = () => {
  return (
    <div className="bg-[#ededed] py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright text */}
          <div className="text-center md:text-left">
            <span className="text-sm">
              Copyright 2025 © <a href="/" className="text-[#d51243] hover:text-[#d51243] font-medium">ShopEase</a>. All rights reserved. 
              Developed by <a href="https://www.linkedin.com/in/sachinpro/" target="black" className="text-[#d51243] hover:text-[#d51243] font-medium">Sachin...</a>.
            </span>
          </div>

          {/* Brand/payment icons */}
          <div className="flex-shrink-0">
            <div className="h-8 w-auto">
              <img src="/PAYMENT.png" alt="" />
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterCopyright;