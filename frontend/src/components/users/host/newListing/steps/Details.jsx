import React, { useEffect, useState } from 'react';

const Details = ({
  beds: initialBeds,
  setBeds,
  bathrooms: initialBathrooms,
  setBathrooms,
  bedrooms: initialBedrooms,
  setBedrooms,
  bed_type: initialBedType,
  setBedType,
  size: initialSize,
  setSize,
  setIsFormComplete,
}) => {
  const [beds, setLocalBeds] = useState(initialBeds || 0);
  const [bathrooms, setLocalBathrooms] = useState(initialBathrooms || 0);
  const [bedrooms, setLocalBedrooms] = useState(initialBedrooms || 0);
  const [bed_type, setLocalBedType] = useState(initialBedType || '');
  const [size, setLocalSize] = useState(initialSize || 0);

  useEffect(() => {
    if (beds !== 0 && bathrooms !== 0 && bedrooms !== 0 && size !== 0 && bed_type !== '') {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [beds, bathrooms, bedrooms, bed_type, size, setIsFormComplete]);

  const handleFieldChange = (setter, increment) => {
    setter((prevValue) => {
      const newValue = Math.max(prevValue + increment, 0);
      setLocalValue(setter, newValue);
      return newValue;
    });
  };

  const setLocalValue = (setter, value) => {
    if (setter === setBeds) setLocalBeds(value);
    else if (setter === setBathrooms) setLocalBathrooms(value);
    else if (setter === setBedrooms) setLocalBedrooms(value);
    else if (setter === setSize) setLocalSize(value);
  };

  const handleBedTypeChange = (event) => {
    const newValue = event.target.value;
    setLocalBedType(newValue);
    setBedType(newValue);
  };

  return (
    <div className="text-blue1">
      <div className='block text-xl sm:grid sm:grid-cols-2 sm:gap-y-20 sm:gap-x-80'>
        <div className=" ">
          <p className="text-2xl mb-5">Beds*</p>
          <div className="">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleFieldChange(setBeds, -1)}>
              -
            </button>
            <input
              className="[appearance:textfield]  w-24 text-center"
              type="number"
              min="1"
              value={beds}
              readOnly
            />
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleFieldChange(setBeds, 1)}>
              +
            </button>
          </div>
        </div>

        <div className=" ">
          <p className="text-2xl mb-5">Bathrooms*</p>
          <div className="">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleFieldChange(setBathrooms, -1)}>
              -
            </button>
            <input
              className="[appearance:textfield]  w-24 text-center"
              type="number"
              min="1"
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
            />
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleFieldChange(setBathrooms, 1)}>
              +
            </button>
          </div>
        </div>

        <div className=" ">
          <p className="text-2xl mb-5">Bedrooms*</p>
          <div className="">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleFieldChange(setBedrooms, -1)}>
              -
            </button>
            <input
              className="[appearance:textfield]  w-24 text-center"
              type="number"
              min="1"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
            />
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleFieldChange(setBedrooms, 1)}>
              +
            </button>
          </div>
        </div>

        {/* Bed Type */}
        <div className="mb-10">
          <p className='text-2xl'>Bed Type*</p>
          <textarea
            maxLength={20}
            id="bed type"
            rows="4"
            className="block p-2.5 py-5 mt-5 w-96 text-sm text-blue1 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Double"
            value={bed_type}
            onChange={handleBedTypeChange}
          ></textarea>
          <label htmlFor="bedtype" className="block mb-2 text-sm font-medium text-gray-900">
            Max characters 20
          </label>
        </div>

        <div className=" ">
          <p className="text-2xl mb-5">Size*</p>
          <div className="">
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleFieldChange(setSize, -1)}>
              -
            </button>
            <input
              className="[appearance:textfield]  w-24 text-center"
              type="number"
              min="1"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
            <button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleFieldChange(setSize, 1)}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
