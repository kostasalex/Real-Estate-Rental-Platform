import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Map from '/src/components/common/maps/Map';

const Location = ({ latitude,setLatitude,longitude,setLongitude,street, setstreet, accessingInfo, setAccessingInfo, setIsFormComplete }) => {
	const [searchQuery, setSearchQuery] = useState('Athens');


	const streetHandler = (address) => {
		const { suburb, town, city, village } = address;
		let street = suburb;
		if (!street) street = town;
		if (!street) street = city;
		if (!street) street = village;
		setstreet(street);
		setSearchQuery(street);
	};

	const handleLatLon = (lat,lon) => {
		let latitude = lat;
		let longitude = lon;
		setLatitude(latitude); // Set latitude state from the address
		setLongitude(longitude); // Set longitude state from the address
	}

	const handleAccessingInfoChange = (event) => {
		setAccessingInfo(event.target.value);
	};

	useEffect(() => {
		if (searchQuery && accessingInfo) {
			setIsFormComplete(true);
		} else {
			setIsFormComplete(false);
		}
	}, [searchQuery, accessingInfo, setIsFormComplete, longitude, latitude]);

	return (
		<div className="text-blue1 mt-10">
			<div className='block text-xl sm:grid sm:grid-cols-2 sm:gap-y-20 sm:gap-x-80'>
				<div className="flex z-0">
					<Map
						streetHandler={streetHandler}
						street={street}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						latitude={latitude} // Pass latitude as prop
						longitude={longitude} // Pass longitude as prop
						handleLatLon = {handleLatLon}
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
