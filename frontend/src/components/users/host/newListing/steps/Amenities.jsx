import React, { useEffect, useState } from 'react';

const Amenities = ({ amenitiesList, setIsFormComplete, cardPropsAmenities }) => {
	const [selectedAmenities, setSelectedAmenities] = useState(new Set());
	setIsFormComplete(true);
	useEffect(() => {

		if (cardPropsAmenities && typeof cardPropsAmenities === 'string') {
			const amenities = cardPropsAmenities
				.replace(/[{()}]/g, '') // Remove curly braces
				.split(',')
				.map((amenity) => amenity.trim().replace(/['"]/g, ''));

			const selectedAmenitiesSet = new Set(amenities);

			setSelectedAmenities(selectedAmenitiesSet);
			//setIsFormComplete(amenitiesList.every((amenity) => selectedAmenitiesSet.has(amenity)));
		}
	}, [cardPropsAmenities, amenitiesList, setIsFormComplete]);

	const handleCheckboxChange = (amenity) => {
		const updatedAmenities = new Set(selectedAmenities);

		if (updatedAmenities.has(amenity)) {
			updatedAmenities.delete(amenity);
		} else {
			updatedAmenities.add(amenity);
		}

		setSelectedAmenities(updatedAmenities);
		setIsFormComplete(amenitiesList.every((amen) => updatedAmenities.has(amen)));
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
								checked={selectedAmenities.has(amenity)}
								onChange={() => handleCheckboxChange(amenity)}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Amenities;
