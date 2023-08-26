import React, { useEffect, useState } from 'react';
import { UploadPhotos } from '/src/components';

const Description = ({ title, setTitle, description, setdescription, roomType, setroomType, photos, setPhotos, rentalRules, setRentalRules, rentalRulesList, setIsFormComplete }) => {

	if (title && description && roomType && photos.length > 0 && rentalRules) {
		setIsFormComplete(true);
	} else {
		setIsFormComplete(false);
	}
	
	useEffect(() => {
		if (title && description && roomType && photos.length > 0 && rentalRules) {
			setIsFormComplete(true);
		} else {
			setIsFormComplete(false);
		}
	}, [title, description, roomType, photos, rentalRules, setIsFormComplete]);

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handledescriptionChange = (event) => {
		setdescription(event.target.value);
	};

	const handleroomTypeChange = (event) => {
		setroomType(event.target.value);
	};

	const handleCheckboxChange = (event, rule) => {
		setRentalRules((prevRules) => {
		  const updatedRules = new Set(prevRules);
		  if (event.target.checked) {
			updatedRules.add(rule);
		  } else {
			updatedRules.delete(rule);
		  }
		  return updatedRules;
		});
	  };

	return (
		<div className="text-blue1">
			<div className='block text-xl sm:grid sm:grid-cols-2 sm:gap-y-20 sm:gap-x-80'>
				<div className="mb-10">
					<p className='text-2xl'>Title*</p>
					<textarea
						maxLength={100}
						id="title"
						rows="4"
						className="block p-2.5 py-5 mt-5 w-96 text-sm text-blue1 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
						placeholder="House in Athens"
						value={title}
						onChange={handleTitleChange}
					></textarea>
					<label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
						Max characters 100
					</label>
				</div>

				<div className="mb-10">
					<p className='text-2xl'>Listing Description*</p>
					<textarea
						maxLength={1500}
						id="description"
						rows="4"
						className="block p-2.5 py-5 mt-5 w-96 text-sm text-blue1 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
						placeholder="About this Place"
						value={description}
						onChange={handledescriptionChange}
					></textarea>
					<label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
						Max characters 1500
					</label>
				</div>

				<div className="mb-10">
					<p className='text-2xl'>Room Type*</p>
					<div className="space-y-4 mt-5">
						<div>
							<label className="inline-flex items-center">
								<input
									type="radio"
									className="form-radio text-blue-500"
									name="roomType"
									value="Shared room"
									checked={roomType === 'Shared room'}
									onChange={handleroomTypeChange}
								/>
								<span className="ml-2 text-gray-700">Shared room</span>
							</label>
						</div>
						<div>
							<label className="inline-flex items-center">
								<input
									type="radio"
									className="form-radio text-blue-500"
									name="roomType"
									value="Private room"
									checked={roomType === 'Private room'}
									onChange={handleroomTypeChange}
								/>
								<span className="ml-2 text-gray-700">Private room</span>
							</label>
						</div>
						<div>
							<label className="inline-flex items-center">
								<input
									type="radio"
									className="form-radio text-blue-500"
									name="roomType"
									value="Entire home/apartment"
									checked={roomType === 'Entire home/apartment'}
									onChange={handleroomTypeChange}
								/>
								<span className="ml-2 text-gray-700">Entire home/apartment</span>
							</label>
						</div>
					</div>
				</div>

				<div className="mb-10 ">
					<p className='text-2xl mb-5 '>Rental Rules</p>
					<div className="flex flex-col  gap-">
						{rentalRulesList.map((rule) => (
							<div className="flex items-center justify-between" key={rule}>
							<label htmlFor={rule} className="text-md text-gray-700">
								{rule}
							</label>
							<input
								type="checkbox"
								id={rule}
								className="ml-2"
								checked={rentalRules.has(rule)}
								onChange={(e) => handleCheckboxChange(e, rule)}
							/>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="mb-10">
				<p className="text-2xl">Photos of the Listing*</p>
				<UploadPhotos
					photos={photos}
					setPhotos={setPhotos}
					numOfPhotos = {3}
				/>
            </div>
        </div>
	);
};

export default Description;
