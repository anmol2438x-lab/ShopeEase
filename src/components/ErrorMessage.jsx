import React from "react";

function ErrorMessage({productErrorData}) {
  return (
    <div className="flex flex-col items-center justify-center  py-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Error Loading Product
        </h2>
        <p className="text-gray-600 mb-6">
          {productErrorData?.message || "Failed to load product information"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#d51243] text-white px-6 py-2 rounded-lg hover:bg-[#b3103a] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
