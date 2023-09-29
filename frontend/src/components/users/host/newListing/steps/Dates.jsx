import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dates = ({ hostArrivalDate, setHostArrivalDate, hostDepartureDate, 
	setHostDepartureDate, selectedDates, setSelectedDates, setIsFormComplete, minimum_nights, setminimum_nights }) => {

	setIsFormComplete(true);
	const [errorMsg, setErrorMsg] = useState('')
	const isDateInRange = (date, startDate, endDate) => {
		return date >= startDate && date <= endDate;
	}

	const doRangesOverlap = (start1, end1, start2, end2) => {
		return isDateInRange(start1, start2, end2) || isDateInRange(end1, start2, end2);
	}

	const handleIncrease = (setter) => {
		setter((prevValue) => prevValue + 1);
	};

	const handleDecrease = (setter) => {
		setter((prevValue) => prevValue > 1 ? prevValue - 1 : 1);
	};
	
	const handleAddDates = () => {
		if (hostArrivalDate && hostDepartureDate) {
			if (hostArrivalDate.getTime() < hostDepartureDate.getTime()) {
				let overlap = false;
				for (let range of selectedDates) {
					const [startStr, endStr] = range.split(' - ');
					const startDate = new Date(startStr);
					const endDate = new Date(endStr);
					if (doRangesOverlap(hostArrivalDate, hostDepartureDate, startDate, endDate)) {
						overlap = true;
						break;
					}
				}

				if (overlap) {
					setErrorMsg('The selected date range overlaps with an existing date range. Please select a different date range.');
				} else {
					setErrorMsg('');
					const formattedDates = `${hostArrivalDate.toLocaleDateString()} - ${hostDepartureDate.toLocaleDateString()}`;
					setSelectedDates([...selectedDates, formattedDates]);
					setHostArrivalDate(null);
					setHostDepartureDate(null);
				}
			} else {
				setErrorMsg('The start date should be before the end date. Please select a valid date range.');
			}
		}
	};

	const handleDeleteDate = (index) => {
		const updatedDates = [...selectedDates];
		updatedDates.splice(index, 1);
		setSelectedDates(updatedDates);
	};

	// Set default arrival and departure dates to the current date
	const defaultArrivalDate = new Date();
	const defaultDepartureDate = new Date();
	defaultDepartureDate.setDate(defaultDepartureDate.getDate() + 1); // Set defaultDepartureDate to be one day after defaultArrivalDate

	// If hostArrivalDate and hostDepartureDate are null, use default values
	const arrivalDate = hostArrivalDate || defaultArrivalDate;
	const departureDate = hostDepartureDate || defaultDepartureDate;

	return (
		
        <div className="block sm:grid sm:grid-cols-2 sm:gap-4 h-full flex items-center justify-center py-10">
            <div className=''>
                <p className='text-center mb-8'>Specify if there are dates when your listing will be unavailable.</p>
				<div className="my-5">
					<label className="text-indigo-500" htmlFor="hostArrivalDate">
						Start of Unavailability:
					</label>
					<div className='flex flex-row'>
						<div className='shadow-sm  hover:shadow-xl'>
							<DatePicker
								id="hostArrivalDate"
								minDate={new Date(arrivalDate.getTime() + 24*60*60*1000)}
								selected={arrivalDate}
								onChange={(date) => setHostArrivalDate(date)}
								dateFormat="dd/MM/yyyy"
								placeholderText="Select arrival date"
							/>
						</div>
					</div>


				</div>

				<div className="my-5">
					<label className="text-indigo-500" htmlFor="hostDepartureDate">
						End of Unavailability:
					</label>
					<div className='flex flex-row'>
						<div className='shadow-sm  hover:shadow-xl'>
							<DatePicker
								id="hostDepartureDate"
								selected={departureDate}
								onChange={(date) => {
									if (date >= arrivalDate) {
										setHostDepartureDate(date);
									}
								}}
								dateFormat="dd/MM/yyyy"
								minDate={new Date(arrivalDate.getTime() + 24*60*60*1000)}
								disabled={!arrivalDate}
								placeholderText="Select departure date"
							/>
						</div>
					</div>
				</div>
				<div className='text-sm text-red-500'>{errorMsg}</div>

				<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleAddDates}>
					Add Dates
				</button>
			</div>

			<div>
				<div className="mb-2">
					<p className="text-indigo-500">Unavailable dates:</p>
					{selectedDates.length > 0 ? (
						selectedDates.map((dates, index) => (
							<div key={index} className="flex items-center my-3">
								<p className="text-gray-700">{dates}</p>
								<button className="ml-5 bg-blue1 hover:bg-blue-400 text-white  py-1 px-2 rounded-full" onClick={() => handleDeleteDate(index)}>X</button>
							</div>
						))
					) : (
						<p className="text-gray-700">No dates selected</p>
					)}
				</div>
			</div>

            <div className='flex mt-10 flex-col justify-center items-start'>
				<div className=' '></div>
                <p className=' flex text-center justify-start my-8'>Specify the minimum stay.</p>
				<div className= "flex flex-col items-center">
					<p className="font-bold  mb-5">Nights *</p>
					<div className="flex items-center ml-5">
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setminimum_nights)}>
							-
						</button>
						<span className="relative">
							<input
								className="[appearance:textfield] w-20 text-center"
								type="number"
								min="1"
								value={minimum_nights}
								onChange={(e) => {
									const value = parseInt(e.target.value);
									setminimum_nights(value < 1 ? 1 : value);
								}}
							/>
						</span>
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setminimum_nights)}>
							+
						</button>
					</div>
				</div>
			</div>


		</div>
	);
};

export default Dates;
