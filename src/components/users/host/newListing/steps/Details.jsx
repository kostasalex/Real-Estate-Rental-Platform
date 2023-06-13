import React, { useState, useEffect } from 'react';

const Details = ({ beds, setBeds, bathrooms, setBathrooms, bedrooms, setBedrooms, livingrooms, setLivingrooms, size, setSize, setIsFormComplete }) => {

  if (beds && bathrooms && bedrooms && size && setIsFormComplete)
    setIsFormComplete(true)

  useEffect(() => {
    if (beds != 0 && bathrooms != 0 && bedrooms != 0 && size != 0) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [beds, bathrooms, bedrooms, livingrooms, size, setIsFormComplete]);

  const handleIncrease = (setter) => {
    setter((prevValue) => prevValue + 1);
  };

  const handleDecrease = (setter) => {
    setter((prevValue) => Math.max(prevValue - 1, 0));
  };

  return (
    <div className="text-blue1">
      <div className='block text-xl sm:grid sm:grid-cols-2 sm:gap-y-20 sm:gap-x-80'>
        <div className=" ">
          <p className="text-2xl mb-5">Beds*</p>
          <div className="">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setBeds)}>
              -
            </button>
            <input
              className="[appearance:textfield]  w-24 text-center"
              type="number"
              min="1"
              value={beds}
              onChange={(e) => setBeds(Number(e.target.value))}
            />
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setBeds)}>
              +
            </button>
          </div>
        </div>

        <div className=" ">
          <p className="text-2xl mb-5">Bathrooms*</p>
          <div className="">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setBathrooms)}>
              -
            </button>
            <input
              className="[appearance:textfield]  w-24 text-center"
              type="number"
              min="1"
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
            />
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setBathrooms)}>
              +
            </button>
          </div>
        </div>


        <div className=" ">
          <p className="text-2xl mb-5">Bedrooms*</p>
          <div className="">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setBedrooms)}>
              -
            </button>
            <input
              className="[appearance:textfield]  w-24 text-center"
              type="number"
              min="1"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
            />
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setBedrooms)}>
              +
            </button>
          </div>
        </div>

        <div className=" ">
          <p className="text-2xl mb-5">Living rooms</p>
          <div className="">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setLivingrooms)}>
              -
            </button>
            <input
             className="[appearance:textfield]  w-24 text-center"
              type="number"
              min="1"
              value={livingrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
            />
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setLivingrooms)}>
              +
            </button>
          </div>
        </div>

        <div className=" ">
          <p className="text-2xl mb-5">Size*</p>
          <div className="">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setSize)}>
              -
            </button>
            <input
              className="[appearance:textfield]  w-24 text-center"
              type="number"
              min="1"
              value={size}
              onChange={(e) => setBathrooms(Number(e.target.value))}
            />
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setSize)}>
              +
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Details;
