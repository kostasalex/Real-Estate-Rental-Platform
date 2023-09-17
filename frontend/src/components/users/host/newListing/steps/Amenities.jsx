import React from 'react';

const Amenities = ({ amenities, setAmenities, setIsFormComplete, amenitiesList }) => {
	setIsFormComplete(true);
	
	console.log(amenitiesList, amenities);
  const handleCheckboxChange = (event, amenity) => {
    setAmenities((prevAmenities) => {
      const updatedAmenities = new Set(prevAmenities);
      if (event.target.checked) {
        updatedAmenities.add(amenity);
      } else {
        updatedAmenities.delete(amenity);
      }
      return updatedAmenities;
    });
  };

  return (
    <div className="text-blue1">
      <div className="mb-10">
        <p className="text-2xl text-center mb-5">Amenities</p>

        <div className="block sm:grid sm:grid-cols-2 sm:gap-16">
          {amenitiesList.map((amenity) => (
            <div className="flex items-center justify-between" key={amenity}>
              <label htmlFor={amenity} className="text-md text-gray-700">
                {amenity}
              </label>
              <input
                type="checkbox"
                id={amenity}
                className="ml-2"
                checked={amenities.has(amenity)}
                onChange={(e) => handleCheckboxChange(e, amenity)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenities;