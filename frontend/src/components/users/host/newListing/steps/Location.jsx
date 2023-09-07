import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Map from '/src/components/common/maps/Map';

const Location = ({ latitude,setLatitude,longitude,setLongitude,street, setstreet, accessingInfo, setAccessingInfo, setIsFormComplete,
	country, setCountry, postcode, setPostCode, city, setCity, road, setRoad}) => {
	
	const [isSaved, setIsSaved] = useState(false);

	const streetHandler = (address) => {
		//console.log(address);
		setstreet(address);
	};

	const handleLatLon = (lat,lon) => {
		setLatitude(lat); // Set latitude state from the address
		setLongitude(lon); // Set longitude state from the address
		//console.log("lat long:" + latitude + " " +longitude );
	}

	const handleAccessingInfoChange = (event) => {
		setAccessingInfo(event.target.value);
	};

	
	useEffect(() => {
		if (isSaved &&  country && postcode && city && road && accessingInfo) {
			setIsFormComplete(true);
		} else {
			setIsFormComplete(false);
		}
	}, [isSaved, country, postcode, city, road, accessingInfo]);

	return (
		<div className="text-blue1 mt-10">
			<div className='block text-xl sm:grid sm:grid-cols-2 sm:gap-y-20 sm:gap-x-80'>
				<div className="flex flex-col text-black justify-center ">
					<label htmlFor="addressInfo" className="mb-4 block text-xl justify-center text-gray-700">
							Location info
					</label>
					<Map
						streetHandler={streetHandler}
						street={street}
						latitude={latitude} // Pass latitude as prop
						longitude={longitude} // Pass longitude as prop
						handleLatLon = {handleLatLon}
						country = {country}
						setCountry = {setCountry} // Default to Athens, Greece
						postcode = {postcode} 
						setPostCode = {setPostCode}
						city = {city}
						setCity = {setCity}
						road = {road}
						setRoad = {setRoad}
						isSaved = {isSaved}
						setIsSaved = {setIsSaved}
					/>
				</div>
				<div className="flex justify-center mx-auto">
					<div className="mb-10">
						<label htmlFor="accessingInfo" className="mb-1 block text-xl text-gray-700">
							Information about Accessing Transportation to the Rental Space
						</label>
						<textarea
							maxLength={1500}
							id="description"
							rows="4"
							className="block w-full p-2.5 py-5 mt-5 w-96 text-sm text-blue1 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Building Entrance: The main entrance to the building is located on Patision."
							value={accessingInfo}
							onChange={handleAccessingInfoChange}
						></textarea>
						<label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
							Max characters 1500
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Location;
