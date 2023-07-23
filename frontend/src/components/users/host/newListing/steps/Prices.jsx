import React, { useEffect } from 'react';

const Prices = ({ price, setprice, additionalGuestPrice, setAdditionalGuestPrice, accommodates, setaccommodates, setIsFormComplete }) => {
	useEffect(() => {
		if (parseFloat(price) !== 0 && parseFloat(additionalGuestPrice) !== 0 && accommodates !== 0) {
			setIsFormComplete(true);
		} else {
			setIsFormComplete(false);
		}
	}, [price, additionalGuestPrice, accommodates, setIsFormComplete]);

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
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setprice)}>
							-
						</button>
						<span className="relative">
							<input
								className="[appearance:textfield] w-20 text-center"
								type="number" // Change type back to "number"
								step="0.01" // Add step attribute to allow decimal input
								value={price}
								onChange={(e) => setprice(e.target.value)}
							/>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2">$</span>
						</span>
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setprice)}>
							+
						</button>
					</div>
				</div>

				<div className="">
					<p className="text-2xl mb-5">Price per additional Guests*</p>
					<div className="flex items-center ml-5">
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setAdditionalGuestPrice)}>
							-
						</button>
						<span className="relative">
							<input
								className="[appearance:textfield] w-20 text-center"
								type="number"
								min="1"
								value={additionalGuestPrice}
								onChange={(e) => setAdditionalGuestPrice(Number(e.target.value))}
							/>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2">$</span>
						</span>
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setAdditionalGuestPrice)}>
							+
						</button>
					</div>
				</div>

				<div className="">
					<p className="text-2xl mb-5">Accommodates *</p>
					<div className="flex items-center ml-5">
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full" onClick={() => handleDecrease(setaccommodates)}>
							-
						</button>
						<span className="relative">
							<input
								className="[appearance:textfield] w-20 text-center"
								type="number"
								min="1"
								value={accommodates}
								onChange={(e) => setaccommodates(Number(e.target.value))}
							/>
						</span>
						<button className="bg-blue1 hover:bg-blue-400 text-white font-bold py-3 px-5 rounded-full" onClick={() => handleIncrease(setaccommodates)}>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Prices;
