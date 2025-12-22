import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductCard, PaddingSection } from "../index";

function ProductsSwitchTab() {
  const { allProducts } = useSelector((state) => state.filterReducer);
  const [activeTab, setActiveTab] = useState("FASHION");
  const [tabProducts, setTabProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const sortedProducts = tabProducts?.sort((a, b) => b.rating - a.rating);

  // Set tabProducts based on activeTab
  useEffect(() => {
    const categoryFilters = {
      FASHION: ["mens-shirts", "tops", "womens-dresses"],
      ELECTRONICS: ["laptops", "smartphones", "tablets"],
      FOOTWEAR: ["mens-shoes", "womens-shoes"],
      GROCERIES: ["groceries"],
      BEAUTY: ["beauty", "skin-care", "fragrances"],
      ACCESSORIES: ["mobile-accessories", "kitchen-accessories"],
      DECORATION: ["home-decoration"],
      SPORTS: ["sports-accessories"],
      WATCH: ["mens-watches", "womens-watches"],
    };

    setTabProducts(
      allProducts.filter((item) =>
        categoryFilters[activeTab]?.includes(item.category)
      )
    );
  }, [activeTab, allProducts]);

  const tabCategory = [
    "FASHION",
    "ELECTRONICS",
    "FOOTWEAR",
    "WATCH",
    "GROCERIES",
    "BEAUTY",
    "ACCESSORIES",
    "DECORATION",
    "SPORTS",
  ];

  return (
    <section className="productsSwitchTabSection">
      <PaddingSection py={6}>
        {/* Tabs Header */}
        <div className="tabs-switch-header flex items-center justify-between gap-y-2 flex-wrap">
          <h2 className="text-2xl font-semibold text-gray-900">
            Popular <span className="text-[#d51243]">Products</span>
          </h2>

          <div className="flex items-center overflow-x-auto hide-scrollbar">
            {tabCategory.map((cat) => (
              <button
                className={`text-sm font-medium py-2 w-fit px-3 border-b-2 hover:text-[#d51243] ${
                  activeTab === cat
                    ? "text-[#d51243] mb-5 border-[#d51243] bg-rose-50"
                    : "border-transparent"
                }`}
                key={cat}
                onClick={() => {
                  setActiveTab(cat);
                  setShowAll(false);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <div className="products">
          <div className="flex lg:flex-wrap gap-2 lg:justify-center overflow-x-auto hide-scrollbar pb-3">
            {sortedProducts?.slice(0, showAll ? sortedProducts.length : 12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View All Button */}
          {sortedProducts.length > 12 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-5 py-2 sm:px-6 sm:py-3 font-semibold rounded-full bg-[#d51243] text-white transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                {showAll ? "Show Less" : "View More"}
              </button>
            </div>
          )}
        </div>
      </PaddingSection>
    </section>
  );
}

export default ProductsSwitchTab;
