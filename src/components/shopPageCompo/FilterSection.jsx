import React, { useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {  applyFilters, loadCategories_Brand, resetFilters, updateFilterValues } from '../../slice/filterReducer';
import {PriceRangeFilter, CheckBrand} from '../index'


const ProductFilters = ({showMobileFilter}) => {
  const { categories, filters } = useSelector(state => state.filterReducer)
  const dispatch = useDispatch()
  


  useEffect(() => {
    dispatch(loadCategories_Brand())  
  }, [filters.category])

  useEffect(() => {
    dispatch(applyFilters())
  }, [filters])





  const handleValues = (e) => {
    let {name, value} = e.target
    dispatch(updateFilterValues({name, value}))
  }



 

  return (
    <div className={`absolute  ${showMobileFilter? 'block' : 'hidden'} h-fit left-0 top-14 lg:top-16 z-10 lg:block lg:sticky bg-white rounded-xl shadow-sm p-6 `}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        <button 
          onClick={() => dispatch(resetFilters())}
          className="text-sm text-[#d51243] hover:text-rose-800"
        >
          Reset all
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, i) => (
            <button
              key={i}
              name='category'
              value={category}
              onClick={handleValues}
              className={`py-2 px-3 text-sm rounded-xl border ${
                filters.category === category 
                  ? 'border-[#d51243] bg-rose-50 text-rose-700' 
                  : 'border-gray-200 hover:bg-rose-50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <PriceRangeFilter />

      {/* Brands */}
      <CheckBrand />
      

      {/* Ratings */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Customer Ratings</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2].map((rating, i) => (
            <div key={i} className="flex items-center">
              <button
                name='rating'
                value={rating}
                onClick={handleValues}
                className={`w-5 h-5 border rounded-sm mr-3 flex items-center justify-center ${
                  parseInt(filters.rating) === rating 
                    ? 'border-[#d51243] bg-[#d51243]' 
                    : 'border-gray-300 hover:border-rose-400'
                }`}
              > 
                {parseInt(filters.rating) === rating && (
                  <FiCheck className="text-white" size={14} />
                )}
              </button>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  i < rating ? (
                    <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="w-4 h-4 text-gray-300" />
                  )
                ))}
                <span className="ml-2 text-xs text-gray-500">& Up</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Availability */}
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Availability</h4>
        <div className="flex space-x-3">
          {['In Stock', 'Out of Stock', 'Show All'].map((item, i) => (
            <button
              type='button'
              key={i}
              name='availability'
              value={item}
              onClick={handleValues}            
              className={`py-2 px-4 border rounded-xl text-sm ${
                filters.availability === item 
                  ? 'border-[#d51243] bg-rose-50 text-rose-700' 
                  : 'border-gray-200 hover:bg-rose-50'
              }`}
            >
              {item}
            </button>

          ))}         
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => dispatch(resetFilters())}
        className="w-full py-3 bg-[#d51243] hover:bg-rose-700 text-white rounded-xl font-medium transition-colors"
      >
        Reset all        
      </button>
    </div>
  );
};

export default ProductFilters;