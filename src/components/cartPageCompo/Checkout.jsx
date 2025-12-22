import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCreditCard,
  FiLock,
  FiShoppingBag,
  FiUser,
  FiMapPin,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";
import { FaPaypal, FaApple } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addOrders } from "../../slice/orderReducer";
import { clearCart } from "../../slice/cartReducer";
import toastNotification from "../../helper/toastNotification";
import { addItemToCartLocal, getOrders, setOrders } from "../../localStorage/handleStorage";
import getDate from "../../helper/getDate";

const Checkout = ({ shippingMethod, setShippingMethod }) => {
  // Checkout steps: 1=Information, 2=Shipping, 3=Payment, 4=Review
  const [currentStep, setCurrentStep] = useState(1);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const { cartItems, cartSummary, appliedCoupon } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch()

  // Form state
  const [formData, setFormData] = useState({
    id: Math.round(Math.random() * 12345) + 12345,
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "India",
    zipCode: "",
    phone: "",
    shippingMethod: shippingMethod,
    paymentMethod: "creditCard",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    acceptTerms: false,
  });

  // new order setUp
  const currentDate = new Date().toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  const newOrder = {
    id: "ORD-" + (Math.round(Math.random() * 12345) + 12345),
    date: currentDate,
    status: "processing",
    items: cartItems,
    appliedCoupon: appliedCoupon,
    orderSummary: cartSummary,
    shippingAddress: {
      name: formData.firstName + formData.lastName,
      street: formData.apartment + formData.address,
      city: formData.city,
      state: formData.city,
      zip: formData.zipCode,
      country: formData.country,
      email: formData.email,
      phone: formData.phone,
    },
    paymentMethod: {
      type: formData.paymentMethod,
      creditCard: {
        cardNumber: formData.cardNumber,
        cvv: formData.cvv,
        expiryDate: formData.expiryDate,
        last4: "4242",
        brand: "Visa",
      },
      upi: {
        upiId: formData.upiId,
      },
    },
    tracking: {
      carrier: "FedEx",
      number: "1234567890",
      steps: [
        {
          date: currentDate,
          status: "Order processed",
          location: "Warehouse",
        },
        {
          date: getDate(formData.shippingMethod === 'standard'? 2 : 1),
          status: "Shipped",
          location: "On the way",
        },
        {
          date: getDate(formData.shippingMethod === 'standard'? 3 : 2),
          status: "Out for delivery",
          location: "Your area",
        },
        {
          date: getDate(formData.shippingMethod === 'standard'? 5 : 3),
          status: "Delivered",
          location: "Front door",
        },
      ],
    },
    deliveryDate: "",
    shippingMethod: shippingMethod,
  };

  // setShiping cost for order summery
  useEffect(() => {
    setShippingMethod(formData.shippingMethod);
  }, [formData.shippingMethod]);

  // Form errors
  const [errors, setErrors] = useState({});

  // Shipping methods
  const shippingMethods = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 0,
      deliveryTime: "3-5 business days",
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 79,
      deliveryTime: "1-2 business days",
    },
  ];

  // Payment methods
  const paymentMethods = [
    { id: "creditCard", name: "Credit Card", icon: <FiCreditCard /> },
    { id: "paypal", name: "PayPal", icon: <FaPaypal /> },
    { id: "applePay", name: "Apple Pay", icon: <FaApple /> },
    { id: "upi", name: "UPI", icon: <FiCreditCard /> },
    { id: "cod", name: "Cash on Delivery", icon: <FiShoppingBag /> },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
    }

    if (currentStep === 2) {
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
    }

    if (currentStep === 3) {
      if (formData.paymentMethod === "creditCard") {
        if (!formData.cardNumber)
          newErrors.cardNumber = "Card number is required";
        if (!formData.expiryDate)
          newErrors.expiryDate = "Expiry date is required";
        if (!formData.cvv) newErrors.cvv = "CVV is required";
      }
      if (formData.paymentMethod === "upi" && !formData.upiId) {
        newErrors.upiId = "UPI ID is required";
      }
      if (!formData.acceptTerms)
        newErrors.acceptTerms = "You must accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Proceed to next step
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go back to previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      if (currentStep < 4) {
        setCurrentStep(4); // Show review step first
      } else {
        const orders = getOrders()  
              
        dispatch(addOrders(newOrder));
        setOrders([newOrder, ...orders]);
        toastNotification('Order Placed Successfully!');
        setIsOrderPlaced(true);
        
        setTimeout(() => {
          dispatch(clearCart());
          addItemToCartLocal([])          
        }, 2000);
      }
    }
  };

  // Steps configuration
  const steps = [
    { id: 1, name: "Information", icon: <FiUser /> },
    { id: 2, name: "Shipping", icon: <FiMapPin /> },
    { id: 3, name: "Payment", icon: <FiCreditCard /> },
    { id: 4, name: "Review", icon: <FiCheck /> },
  ];

  return (
    <div className="min-h-screen lg:w-2/3">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        {/* Header */}
        <header className="bg-white p-6 shadow-sm ">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevStep}
                  className={`text-[#d51243] flex items-center mr-6 ${
                    currentStep === 1 ? "invisible" : ""
                  }`}
                >
                  <FiArrowLeft className="mr-2" />
                  <span className="font-medium">Back</span>
                </button>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiLock className="text-[#d51243]" />
                  <span className="text-sm">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className=" p-6">
          {/* Checkout Form */}
          <div className="">
            <div className="mb-8">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8 mx-6">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center relative"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors
                        ${
                          currentStep >= step.id
                            ? "bg-[#d51243] text-white"
                            : "bg-gray-200 text-gray-600"
                        }
                        ${
                          currentStep === step.id
                            ? "ring-2 ring-[#d51243] ring-offset-2"
                            : ""
                        }
                      `}
                    >
                      {currentStep > step.id ? (
                        <FiCheck size={16} />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        currentStep >= step.id
                          ? "text-[#d51243] font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute top-4 -right-12 w-12 h-0.5 transition-colors
                          ${
                            currentStep > step.id
                              ? "bg-[#d51243]"
                              : "bg-gray-200"
                          }
                        `}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          errors.email ? "border-red-500" : "border-gray-200"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border ${
                            errors.firstName
                              ? "border-red-500"
                              : "border-gray-200"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent`}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border ${
                            errors.lastName
                              ? "border-red-500"
                              : "border-gray-200"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent`}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Information */}
              {currentStep === 2 && (
                <>
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Shipping Address
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border ${
                            errors.address
                              ? "border-red-500"
                              : "border-gray-200"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent`}
                          placeholder="Street and house number"
                        />
                        {errors.address && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.address}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border ${
                              errors.city ? "border-red-500" : "border-gray-200"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent`}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.city}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <div className="relative">
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent"
                            >
                              <option value={"India"}>India</option>
                              <option value={"Canada"}>Canada</option>
                              <option value={"United Kingdom"}>
                                United Kingdom
                              </option>
                            </select>
                            <FiChevronDown className="absolute right-3 top-4 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border ${
                              errors.zipCode
                                ? "border-red-500"
                                : "border-gray-200"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent`}
                          />
                          {errors.zipCode && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.zipCode}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border ${
                            errors.phone ? "border-red-500" : "border-gray-200"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent`}
                          placeholder="+91 (___) ___-____"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">
                      Shipping Method
                    </h2>
                    <div className="space-y-3">
                      {shippingMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                            ${
                              formData.shippingMethod === method.id
                                ? "border-[#d51243] bg-[#fdf2f5]"
                                : "border-gray-200 hover:border-[#d51243]"
                            }
                          `}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              shippingMethod: method.id,
                            })
                          }
                        >
                          <input
                            type="radio"
                            name="shippingMethod"
                            id={method.id}
                            checked={formData.shippingMethod === method.id}
                            onChange={() => {}}
                            className="h-4 w-4 text-[#d51243] focus:ring-[#d51243]"
                          />
                          <label htmlFor={method.id} className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <span className="font-medium">{method.name}</span>
                              <span className="font-medium">
                                ₹{method.price.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              {method.deliveryTime}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Payment Information */}
              {currentStep === 3 && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                            ${
                              formData.paymentMethod === method.id
                                ? "border-[#d51243] bg-[#fdf2f5]"
                                : "border-gray-200 hover:border-[#d51243]"
                            }
                          `}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              paymentMethod: method.id,
                            })
                          }
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            id={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={() => {}}
                            className="h-4 w-4 text-[#d51243] focus:ring-[#d51243]"
                          />
                          <label
                            htmlFor={method.id}
                            className="ml-3 flex items-center space-x-2"
                          >
                            <span className="text-lg">{method.icon}</span>
                            <span className="font-medium">{method.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>

                    {formData.paymentMethod === "creditCard" && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border ${
                              errors.cardNumber
                                ? "border-red-500"
                                : "border-gray-200"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent`}
                            placeholder="1234 5678 9012 3456"
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border ${
                                errors.expiryDate
                                  ? "border-red-500"
                                  : "border-gray-200"
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent`}
                              placeholder="MM/YY"
                            />
                            {errors.expiryDate && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.expiryDate}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border ${
                                errors.cvv
                                  ? "border-red-500"
                                  : "border-gray-200"
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent`}
                              placeholder="123"
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.cvv}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "upi" && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            UPI ID
                          </label>
                          <input
                            type="text"
                            name="upiId"
                            value={formData.upiId}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border ${
                              errors.upiId
                                ? "border-red-500"
                                : "border-gray-200"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d51243] focus:border-transparent`}
                            placeholder="yourname@upi"
                          />
                          {errors.upiId && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.upiId}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "cod" && (
                      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-700">
                          Pay with cash when your order is delivered.
                        </p>
                      </div>
                    )}

                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#d51243] focus:ring-[#d51243] rounded"
                      />
                      <label
                        htmlFor="acceptTerms"
                        className="ml-2 text-sm text-gray-600"
                      >
                        I agree to the{" "}
                        <a href="#" className="text-[#d51243]">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#d51243]">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.acceptTerms}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Review Order */}
              {currentStep === 4 && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Review Your Order
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Contact Information</h3>
                      <p className="text-gray-600">{formData.email}</p>
                      <p className="text-gray-600">
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Shipping Address</h3>
                      <p className="text-gray-600">{formData.address}</p>
                      {formData.apartment && (
                        <p className="text-gray-600">{formData.apartment}</p>
                      )}
                      <p className="text-gray-600">
                        {formData.city}, {formData.country} {formData.zipCode}
                      </p>
                      <p className="text-gray-600">{formData.phone}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Shipping Method</h3>
                      <p className="text-gray-600">
                        {
                          shippingMethods.find(
                            (m) => m.id === formData.shippingMethod
                          )?.name
                        }{" "}
                        (₹{formData.shippingMethod === "standard" ? 0 : 79})
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <p className="text-gray-600">
                        {
                          paymentMethods.find(
                            (m) => m.id === formData.paymentMethod
                          )?.name
                        }
                        {formData.paymentMethod === "upi" &&
                          formData.upiId &&
                          ` (${formData.upiId})`}
                      </p>
                    </div>
                  </div>

                  {isOrderPlaced && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                      <div className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" />
                        <h3 className="text-green-800 font-medium">
                          Order Placed Successfully!
                        </h3>
                      </div>
                      <p className="text-green-700 mt-2">
                        Your order has been received and is being processed.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-6">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-[#d51243] text-white py-4 rounded-lg font-medium hover:bg-[#b30f3a] transition-colors shadow-md"
                  >
                    {currentStep === 3
                      ? "Review Order"
                      : `Continue to ${steps[currentStep].name}`}
                  </button>
                ) : (
                  !isOrderPlaced && (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full bg-[#d51243] text-white py-4 rounded-lg font-medium hover:bg-[#b30f3a] transition-colors shadow-md"
                    >
                      Place Order
                    </button>
                  )
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Checkout;
