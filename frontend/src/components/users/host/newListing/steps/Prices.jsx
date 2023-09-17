import React, { useEffect, useState } from 'react';

const Prices = ({ price, setprice, additionalGuestPrice, setAdditionalGuestPrice, accommodates, setaccommodates, setIsFormComplete }) => {
	const [localPrice, setLocalPrice] = useState(price);
	const [localAdditionalGuestPrice, setLocalAdditionalGuestPrice] = useState(additionalGuestPrice);
	const [localAccommodates, setLocalAccommodates] = useState(accommodates);

	useEffect(() => {
		if (parseFloat(localPrice) !== 0  && parseFloat(localAccommodates) !== 0) {
			setIsFormComplete(true);
		} else {
			setIsFormComplete(false);
		}
	}, [localPrice, localAdditionalGuestPrice, localAccommodates, setIsFormComplete]);

	const handleIncrease = (setter) => {
		setter((prevValue) => prevValue + 1);
	};

	const handleDecrease = (setter) => {
		setter((prevValue) => Math.max(prevValue - 1, 0));
	};

	return (
		<div className="text-blue1">
			<div className='block text-xl sm:grid sm:grid-cols-2 sm:gap-y-20 sm:gap-x-80'>
				<div className="">
					<p className="text-2xl mb-5">Min price for 1 Guest*</p>
					<div className="flex items-center ml-5">
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setLocalPrice)}>
							-
						</button>
						<span className="relative">
							<input
								className="[appearance:textfield] w-20 text-center"
								type="number"
								step="0.01"
								value={localPrice}
								onChange={(e) => setLocalPrice(parseFloat(e.target.value))}
							/>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2">$</span>
						</span>
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setLocalPrice)}>
							+
						</button>
					</div>
				</div>

				<div className="">
					<p className="text-2xl mb-5">Price per additional Guests*</p>
					<div className="flex items-center ml-5">
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setLocalAdditionalGuestPrice)}>
							-
						</button>
						<span className="relative">
							<input
								className="[appearance:textfield] w-20 text-center"
								type="number"
								step="0.01"
								min="1"
								value={additionalGuestPrice}
								onChange={(e) => setLocalAdditionalGuestPrice(parseFloat(e.target.value))}
							/>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2">$</span>
						</span>
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setLocalAdditionalGuestPrice)}>
							+
						</button>
					</div>
				</div>

				<div className="">
					<p className="text-2xl mb-5">Accommodates *</p>
					<div className="flex items-center ml-5">
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setLocalAccommodates)}>
							-
						</button>
						<span className="relative">
							<input
								className="[appearance:textfield] w-20 text-center"
								type="number"
								min="1"
								value={localAccommodates}
								onChange={(e) => setLocalAccommodates(parseInt(e.target.value))}
							/>
						</span>
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setLocalAccommodates)}>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Prices;
