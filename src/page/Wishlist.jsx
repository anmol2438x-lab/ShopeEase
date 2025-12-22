import React, { memo } from "react";
import { FiChevronLeft } from "react-icons/fi";
// import { AddToCartPopup } from '../components';
import { useSelector } from "react-redux";
import { PageToHome, WishlistEmpty, WishlistItemCard } from "../components";
import { useNavigate } from "react-router-dom";


const Wishlist = () => {
  const wishlistItems = useSelector(
    (state) => state.wishlistReducer.whislistItems
  );

  const navigate = useNavigate();

 
 

  return (
    <>
      <div className="container mx-auto">
        <PageToHome pageName={"Wishlist"} />

      </div>
      <div className=" py-10 lg:p-10">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-rose-500 mr-4"
          >
            <FiChevronLeft className="mr-1" size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">
            My Wishlist{" "}
            <span className="text-rose-500">({wishlistItems.length})</span>
          </h1>
        </div>

        {/* Wishlist Items Grid */}
        <div className="flex flex-wrap py-6 md:p-10 gap-3 mx-auto justify-center lg:py-8">
          {wishlistItems.length === 0 ? (
            <WishlistEmpty />
          ) : (
            wishlistItems.map((item) => {
              return <WishlistItemCard key={item.id} item={item} />;
            })
          )}
        </div>

      </div>
    </>
  );
};

export default memo(Wishlist);
