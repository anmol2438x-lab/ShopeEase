import React, { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterValues } from "../../slice/filterReducer";
import Slider from "@mui/material/Slider";

const PriceRangeFilter = () => {
  const { filters } = useSelector((state) => state.filterReducer);
  const dispatch = useDispatch();

  const min = filters.min || 0
  const max = filters.max || 1000
  const minDistance = (max * 2) / 100;

  const [value, setValue] = useState([min, max]);
  const [isDirty, setIsDirty] = useState(false);
  
  

  
  useEffect(() => {
    setValue([filters.min || min, filters.max || max]);
    setIsDirty(false);
  }, [filters.min, filters.max]);

  const handleSliderChange = (e, newValue, activeThumb) => {
    setIsDirty(true);
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const handleInputChange = (e, index) => {
    setIsDirty(true);
    const newValue = [...value];
    const numValue = Math.max(min, Math.min(max, Number(e.target.value)));
    newValue[index] = numValue;

    // Enforce minimum range
    if (index === 0) {
      if (newValue[1] - numValue < minDistance) {
        newValue[1] = Math.min(max, numValue + minDistance);
      }
    } else {
      if (numValue - newValue[0] < minDistance) {
        newValue[0] = Math.max(min, numValue - minDistance);
      }
    }

    setValue(newValue);
  };

  const applyFilter = () => {
    dispatch(updateFilterValues({ 
      name: "priceRange", 
      value: value 
    }));
    setIsDirty(false);
  };



  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-gray-700 mb-4">Price Range</h4>

      {/* Slider */}
      <div className="mb-8">
        <Slider
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `₹${v.toLocaleString()}`}
          disableSwap
          sx={{
            color: '#d51243',
            height: 6,
            '& .MuiSlider-thumb': {
              width: 16,
              height: 16,
              backgroundColor: '#fff',
              border: '2px solid #d51243',
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 6px rgba(213,18,67,0.2)',
              },
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: '#d51243',
              borderRadius: 2,
              fontSize: 12,
            },
          }}          
        />
      </div>

      {/* Input Fields */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <LiaRupeeSignSolid className="text-gray-500" size={16} />
          </div>
          <input
            type="number"
            min={min}
            max={max}
            value={value[0]}
            onChange={(e) => handleInputChange(e, 0)}
            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm 
                      focus:ring-2 focus:ring-[#d51243]/50 focus:border-[#d51243]"
          />
        </div>
        
        <span className="text-gray-400">to</span>
        
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <LiaRupeeSignSolid className="text-gray-500" size={16} />
          </div>
          <input
            type="number"
            min={min}
            max={max}
            value={value[1]}
            onChange={(e) => handleInputChange(e, 1)}
            className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm 
                      focus:ring-2 focus:ring-[#d51243]/50 focus:border-[#d51243]"
          />
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={applyFilter}
        disabled={!isDirty}
        className={`w-full py-3 rounded-xl font-medium transition-all
          ${isDirty 
            ? 'bg-[#d51243] text-white hover:bg-[#b3103a] shadow-md hover:shadow-lg' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
      >
        {isDirty ? 'Apply Price Range' : 'Price Range Set'}
      </button>
    </div>
  );
};

export default PriceRangeFilter;