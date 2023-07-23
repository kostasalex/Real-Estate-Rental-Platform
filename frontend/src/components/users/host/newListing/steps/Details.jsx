import React, { useEffect } from 'react';

const Details = ({ beds, setBeds, bathrooms, setBathrooms, bedrooms, setBedrooms, bed_type, setbed_type, size, setSize, setIsFormComplete }) => {
  useEffect(() => {
    if (beds !== 0 && bathrooms !== 0 && bedrooms !== 0 && size !== 0) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [beds, bathrooms, bedrooms, bed_type, size, setIsFormComplete]);

  const handleIncrease = (setter) => {
    setter((prevValue) => prevValue + 1);
  };

  const handleDecrease = (setter) => {
    setter((prevValue) => Math.max(prevValue - 1, 0));
  };

  const handBedTypeChange = (event) => {
		setbed_type(event.target.value);
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

				<div className="mb-10">
					<p className='text-2xl'>Bed Type*</p>
					<textarea
						maxLength={100}
						id="bed type"
						rows="4"
						className="block p-2.5 py-5 mt-5 w-96 text-sm text-blue1 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
						placeholder="Double"
						value={bed_type}
						onChange={handBedTypeChange}
					></textarea>
					<label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
						Max characters 100
					</label>
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
              onChange={(e) => setSize(Number(e.target.value))}
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
