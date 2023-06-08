import React, { useState, useEffect } from 'react';

const Prices = ({ defaultGuestPrice, setDefaultGuestPrice, additionalGuestPrice, setAdditionalGuestPrice, maxGuests, setMaxGuests, setIsFormComplete }) => {

  useEffect(() => {
    if (defaultGuestPrice != 0 && additionalGuestPrice != 0 && maxGuests != 0) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [defaultGuestPrice, additionalGuestPrice, maxGuests, setIsFormComplete]);

  const handleIncrease = (setter) => {
    setter((prevValue) => prevValue + 1);
  };

  const handleDecrease = (setter) => {
    setter((prevValue) => Math.max(prevValue - 1, 0));
  };


  return (
    <div className="text-blue1">
      <div className='block text-xl sm:grid sm:grid-cols-2 sm:gap-y-20 sm:gap-x-80'>
        
        <div className="">
          <p className="text-2xl mb-5">Min price for 1 Guest*</p>
          <div className="flex items-center ml-5">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setDefaultGuestPrice)}>
              -
            </button>
            <span className="relative">
              <input
                className="[appearance:textfield] w-20 text-center "
                type="number"
                min="1"
                value={defaultGuestPrice}
                onChange={(e) => setDefaultGuestPrice(Number(e.target.value))}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">$</span>
            </span>
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setDefaultGuestPrice)}>
              +
            </button>
          </div>
        </div>

        <div className="">
          <p className="text-2xl mb-5">Price per additional Guests*</p>
          <div className="flex items-center ml-5">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setAdditionalGuestPrice)}>
              -
            </button>
            <span className="relative">
              <input
                className="[appearance:textfield] w-20 text-center "
                type="number"
                min="1"
                value={additionalGuestPrice}
                onChange={(e) => setAdditionalGuestPrice(Number(e.target.value))}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">$</span>
            </span>
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setAdditionalGuestPrice)}>
              +
            </button>
          </div>
        </div>

        <div className="">
          <p className="text-2xl mb-5">Max Guests*</p>
          <div className="flex items-center ml-5">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setMaxGuests)}>
              -
            </button>
            <span className="relative">
              <input
                className="[appearance:textfield] w-20 text-center "
                type="number"
                min="1"
                value={maxGuests}
                onChange={(e) => setMaxGuests(Number(e.target.value))}
              />
            </span>
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setMaxGuests)}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prices