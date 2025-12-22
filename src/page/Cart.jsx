import React, { useEffect, useState } from "react";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import {
  CartItems,
  CouponSection,
  EmptyCart,
  Loader,
  OrderSummary,
  Checkout
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppliedCouponInLocal,
} from "../localStorage/handleStorage";
import { setAppliedCoupon, updateCartSummary } from "../slice/cartReducer";

const Cart = () => {
  const [toggleCart, setToggleCart] = useState('cart')
  const [shippingMethod, setShippingMethod] = useState('standard')

  const dispatch = useDispatch()
  const {cartItems, appliedCoupon} = useSelector((state) => state.cartReducer);



  // Calculate subtotal
  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = shippingMethod === 'express' ? 79 : subtotal > 450 ? 0 : 50;
  const tax = subtotal * 0.1;


  // Calculate discount
  let discount = 0;
  let total = 0;
  useEffect(() => {
    if (appliedCoupon) {
      if (appliedCoupon.type === "percentage") {
        discount = subtotal * (appliedCoupon.discount / 100);
      } else {
        discount = appliedCoupon.discount;
      }
    }
    total = subtotal + shipping + tax - discount;
  }, [appliedCoupon, cartItems, shippingMethod])



  // set appliedCoupon on local storerage
  useEffect(() => {
    if(appliedCoupon){
      setAppliedCouponInLocal(appliedCoupon);
      if(subtotal < appliedCoupon.minOrder || cartItems.length === 0){
        dispatch(setAppliedCoupon(null))
      }
    }else{
      setAppliedCouponInLocal(null);
    }
  }, [appliedCoupon, cartItems]);

  // update cartSummary in store 
  useEffect(() => {
    const orderSummary= {
      subtotal: subtotal.toFixed(2),
      shipping: Math.round(shipping),
      discount: Math.round(discount),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    }
    dispatch(updateCartSummary(orderSummary))    
  }, [cartItems, shippingMethod, appliedCoupon])

  if (!cartItems) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <NavLink
          to="/shop"
          className="flex items-center text-[#d51243] hover:text-rose-800 mr-4"
        >
          <FiArrowLeft className="mr-2" /> Continue Shopping
        </NavLink>

        {toggleCart === 'cart' ? (
          <h1 className="text-3xl font-bold flex items-center">
            <FiShoppingCart className="mr-2" /> Your Shopping Cart
          </h1>
        ) : (
          <h1 className="text-3xl font-bold flex items-center">
           <IoBagCheckOutline className="mr-2"/> Proceed to Checkout
          </h1>
        )}
        
      </div>

      {/* Coupon Section */}    
      <CouponSection />

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items  */}          
          {toggleCart === 'cart' ? (<CartItems />) : (cartItems.length !== 0 && <Checkout shippingMethod={shippingMethod} setShippingMethod={setShippingMethod}/>)}

          {/* Order Summary */}
          <OrderSummary
            toggleCart={toggleCart}
            setToggleCart={setToggleCart}
          />
        </div>
      )}
    </div>
    
  );
};

export default Cart;
