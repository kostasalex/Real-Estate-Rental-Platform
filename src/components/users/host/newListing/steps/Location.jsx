import React from 'react';
import Map from '/src/components/common/maps/Map';

const Location = ({ formattedAddress, setFormattedAddress, accessingInfo, setAccessingInfo, setIsFormComplete }) => {
  const [searchQuery, setSearchQuery] = React.useState('Athens');

  /* Temporary for testing */
  if(searchQuery && accessingInfo)
  setIsFormComplete(true)

  const formattedAddressHandler = (address) => {
    const { suburb, town, city, village } = address;
    let formattedAddress = suburb;
    if (!formattedAddress) formattedAddress = town;
    if (!formattedAddress) formattedAddress = city;
    if (!formattedAddress) formattedAddress = village;
    setFormattedAddress(formattedAddress);
    setSearchQuery(formattedAddress);
  };

  const handleAccessingInfoChange = (event) => {
    setAccessingInfo(event.target.value);
  };

  React.useEffect(() => {
    if(searchQuery && accessingInfo)
      setIsFormComplete(true)
    else(setIsFormComplete(false))
  },[searchQuery,accessingInfo]);

  return (
    <div className="flex space-y-10 flex-col justify-center items-center">
      <div className="flex z-0">
        <Map
          formattedAddressHandler={formattedAddressHandler}
          formattedAddress={formattedAddress}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="flex justify-center mx-auto border-t-2">
        <div className="my-10">
          <label htmlFor="accessingInfo" className="mb-1 block text-xl text-gray-700">
            Information about Accessing Transportation to the Rental Space
          </label>
          <textarea
            id="accessingInfo"
            className="block w-full text-md font-serif rounded-md border-2 mt-2 border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
            rows="3"
            placeholder="Leave a message"
            value={accessingInfo}
            onChange={handleAccessingInfoChange}
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">Help message.</p>
        </div>
      </div>
    </div>
  );
};

export default Location;
