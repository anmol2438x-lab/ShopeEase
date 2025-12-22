import React, { useState } from "react";
import { FiCheck, FiUser } from "react-icons/fi";
import {RatingStars} from "../index";

function ProductTab({productData}) {

  const [activeTab, setActiveTab] = useState("description");




  const TABS = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${productData?.reviews?.length || 0})` },
    { id: "questions", label: "Questions" },
  ];

  return (
    <div className="mt-12 overflow-x-auto scroll-smooth snap-x hide-scrollbar">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[#d51243] text-[#d51243]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="py-8">
        {activeTab === "description" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Product Description</h3>
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {productData.description}
            </p>

            {productData.usageInstructions && (
              <>
                <h4 className="font-medium mb-2">How To Use:</h4>
                <p className="text-gray-700 mb-6 whitespace-pre-line">
                  {productData.usageInstructions}
                </p>
              </>
            )}

            {productData.ingredients && (
              <>
                <h4 className="font-medium mb-2">Key Ingredients:</h4>
                <p className="text-gray-700 whitespace-pre-line">
                  {productData.ingredients}
                </p>
              </>
            )}
          </div>
        )}

        {activeTab === "specifications" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Specifications</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Product Details</h4>
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { label: "Brand", value: productData.brand },
                      { label: "Category", value: productData.category },
                      { label: "SKU", value: productData.sku },
                      { label: "Weight", value: productData.weight },
                    ].map(
                      (item, index) =>
                        item.value && (
                          <tr key={index}>
                            <td className="py-2 pr-4 text-gray-600">
                              {item.label}:
                            </td>
                            <td className="py-2 font-medium capitalize">
                              {item.value}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
              <div>
                <h4 className="font-medium mb-3">Technical Details</h4>
                <p>Sorry currently don't have Technical Details</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Customer Reviews</h3>
              <button className="bg-[#d51243] text-white px-4 py-2 rounded hover:bg-[#b3103a] transition-colors">
                Write a Review
              </button>
            </div>

            {productData.reviews?.length > 0 ? (
              <div className="space-y-6">
                {productData.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-x-2">
                          <FiUser />
                          <h4 className="font-medium">{review.reviewerName}</h4>
                        </div>

                        <div className="flex items-center">
                          <RatingStars rating={review.rating} small />
                          <span className="text-gray-500 text-sm ml-2">
                            Posted on{" "}
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="text-green-600 text-sm flex items-center">
                          <FiCheck className="mr-1" /> Verified Purchase
                        </span>
                      )}
                    </div>
                    <h5 className="font-medium text-gray-900 mb-1">
                      {review.comment}
                    </h5>

                    {review.images?.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {review.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`Review ${index + 1}`}
                            className="h-16 w-16 object-cover rounded border border-gray-200"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  No reviews yet. Be the first to review this product!
                </p>
                <button className="bg-[#d51243] text-white px-6 py-2 rounded hover:bg-[#b3103a] transition-colors">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "questions" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Customer Questions</h3>
              <button className="bg-[#d51243] text-white px-4 py-2 rounded hover:bg-[#b3103a] transition-colors">
                Ask a Question
              </button>
            </div>

            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                No questions yet. Be the first to ask about this product!
              </p>
              <button className="bg-[#d51243] text-white px-6 py-2 rounded hover:bg-[#b3103a] transition-colors">
                Ask a Question
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductTab;
