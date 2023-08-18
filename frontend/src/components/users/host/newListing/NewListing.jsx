import React, { useEffect, useState } from 'react';
import Stepper from './Stepper';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Description, Location, Prices, Dates, Details, Amenities } from './steps';

const NewListing = ({ hosts_id }) => {
	const navigate = useNavigate();


	const [step, setStep] = useState(1);
	const [steps, setSteps] = useState([
		'Location',
		'Description',
		'Details',
		'Amenities',
		'Dates',
		'Prices'
	]);


	function nextStepHandler() {
		setStep(step + 1);
	}

	function prevStepHandler() {
		setStep(step - 1);
	}

	const postHandler = async (values) => {
		try {
			// Create an array from the Set of selected amenities
			const amenities = Array.from(values.amenities);

			// Generate a random cardId
			const cardId = Math.floor(Math.random() * 10000);
			const hosts_id = Math.floor(Math.random() * 10000);

			const requestBody = {
				...values,
				amenities: `{${amenities.join(',')}}`,
				id: cardId,
				hosts_id: hosts_id, // Include the hosts_id as hosts_id in the request body
				lat: values.lat,
				lng: values.lng,
				bed_type: values.bed_type,
			};

			console.log('Request JSON:', JSON.stringify(requestBody, null, 2)); // Log the JSON that will be sent to the server

			const response = await fetch('https://localhost:8443/cards', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});

			if (response.ok) {
				const responseData = await response.text(); // Get the response text
				console.log('Response Data:', responseData); // Log the response data
				const cardId = JSON.parse(responseData).id; // Attempt to parse the JSON data


				Swal.fire({
					title: 'Welcome !',
					text: 'Your card has been successfully posted.',
					icon: 'success',
					confirmButtonText: 'OK'
				}).then(() => {
					const cardData = {
						id: cardId,
						thumbnailUrl: values.photos,
						mediumUrl: values.photos,
						price: values.price,
						accommodates: values.accommodates,
						bathrooms: values.bathrooms,
						bedrooms: values.bedrooms,
						numberOfReviews: 2, //values.numberOfReviews,
						reviewScoresRating: 2, // values.reviewScoresRating,
						street: values.street,
						description: values.description,
						lng: values.lng,
						lat: values.lat,
						amenities: values.amenities,
						hosts_id: hosts_id, // Include the hosts_id as hosts_id in the cardData object
						beds: values.beds,
						name: values.title,
						roomType: values.roomType,
					};

					// Handle the cardData object as needed, e.g., store it in state or pass it to a parent component
					console.log(cardData);
					navigate('/');
				});
			} else {
				const errorMessage = await response.text();
				Swal.fire({
					title: 'Error',
					text: errorMessage,
					icon: 'error',
					confirmButtonText: 'OK'
				});
			}
		} catch (error) {
			console.error(error);
			Swal.fire({
				title: 'Error',
				text: 'An error occurred while processing your request.',
				icon: 'error',
				confirmButtonText: 'OK'
			});
		}
	};



	const [isFormComplete, setIsFormComplete] = useState(false);

	useEffect(() => {
		setIsFormComplete(false);
	}, [step]);

	// Location Step State
	const [street, setstreet] = useState('');
	const [accessingInfo, setAccessingInfo] = useState('');
	const [lat, setLatitude] = useState(''); // Add lat state
	const [lng, setLongitude] = useState(''); // Add lng state

	// Description Step State
	const [title, setTitle] = useState('');
	const [description, setdescription] = useState('');
	const [roomType, setroomType] = useState('');
	const [photos, setPhotos] = useState([]);
	const [rentalRules, setRentalRules] = useState({
		children: false,
		infants: false,
		pets: false,
		smoking: false,
		events: false
	});

	// Details Step State
	const [beds, setBeds] = useState(0);
	const [bathrooms, setBathrooms] = useState(0);
	const [bedrooms, setBedrooms] = useState(0);
	const [bed_type, setBedType] = useState('');
	const [size, setSize] = useState(0);

	// Dates Step State
	const [hostArrivalDate, setHostArrivalDate] = useState(new Date()); // Set default value to the current date
	const [hostDepartureDate, setHostDepartureDate] = useState(new Date()); // Set default value to the current date
	const [selectedDates, setSelectedDates] = useState([]);

	// Prices Step State
	const [price, setprice] = useState(0);
	const [additionalGuestPrice, setAdditionalGuestPrice] = useState(0);
	const [accommodates, setaccommodates] = useState(0);

	// Amenities Step State
	const [amenities, setAmenities] = useState(new Set()); // Initialize as a Set
	const amenitiesList = [
		'TV',
		'Internet',
		'Air_Conditioning',
		'Kitchen',
		'Heating',
		'Family_Kid_Friendly',
		'Washer',
		'Shampoo',
		'Parking',
		'Elevator'
	];

	return (
		<div className="p-5">
			<Stepper steps={steps} currentStep={step} />

			<div className="font font-semibold text-lg flex justify-center p-10">
				{step === 1 && (
					<Location
						street={street}
						setstreet={setstreet}
						accessingInfo={accessingInfo}
						setAccessingInfo={setAccessingInfo}
						setIsFormComplete={setIsFormComplete}
						lat={lat}
						lng={lng}
						setLatitude={setLatitude}
						setLongitude={setLongitude}
					/>
				)}

				{step === 2 && (
					<Description
						title={title}
						setTitle={setTitle}
						description={description}
						setdescription={setdescription}
						roomType={roomType}
						setroomType={setroomType}
						photos={photos}
						setPhotos={setPhotos}
						rentalRules={rentalRules}
						setRentalRules={setRentalRules}
						setIsFormComplete={setIsFormComplete}
					/>
				)}

				{step === 3 && (
					<Details
						beds={beds}
						setBeds={setBeds}
						bathrooms={bathrooms}
						setBathrooms={setBathrooms}
						bedrooms={bedrooms}
						setBedrooms={setBedrooms}
						bed_type={bed_type}
						setBedType={setBedType}
						size={size}
						setSize={setSize}
						setIsFormComplete={setIsFormComplete}
					/>
				)}

				{step === 4 && (
					<Amenities
						amenities={amenities}
						setAmenities={setAmenities}
						setIsFormComplete={setIsFormComplete}
						amenitiesList={amenitiesList} // Pass the amenitiesList to the Amenities component
					/>
				)}

				{step === 5 && (
					<Dates
						hostArrivalDate={hostArrivalDate}
						setHostArrivalDate={setHostArrivalDate}
						hostDepartureDate={hostDepartureDate}
						setHostDepartureDate={setHostDepartureDate}
						selectedDates={selectedDates}
						setSelectedDates={setSelectedDates}
						setIsFormComplete={setIsFormComplete}
					/>
				)}

				{step === 6 && (
					<Prices
						price={price}
						setprice={setprice}
						additionalGuestPrice={additionalGuestPrice}
						setAdditionalGuestPrice={setAdditionalGuestPrice}
						accommodates={accommodates}
						setaccommodates={setaccommodates}
						setIsFormComplete={setIsFormComplete}
					/>
				)}
			</div>

			<div className="flex justify-center">
				{step > 1 && (
					<button
						className="text-base hover:scale-110 mr-10 focus:outline-none flex  px-4 py-2 rounded font-bold cursor-pointer hover:bg-gray-200  bg-gray-100 
            text-gray-700 
            border duration-200 ease-in-out 
            border-gray-600 transition"
						onClick={prevStepHandler}
					>
						Previous
					</button>
				)}
				<div className="flex flex-row">
					{steps.length > step && (
						<>
							{isFormComplete ? (
								<button
									className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                  hover:bg-blue1  
                  bg-blue1 
                  text-blue0 
                  border duration-200 ease-in-out 
                  border-blue1 transition"
									onClick={nextStepHandler}
								>
									Next
								</button>
							) : (
								<button
									className="text-base  ml-2  flex justify-center px-4 py-2 rounded font-bold cursor-not-allowed 
                  bg-gray-50 
                  text-gray-500
                  border-2
                  border-gray-500
                  duration-200 ease-in-out 
                  transition"
									disabled
								>
									Next
								</button>
							)}
						</>
					)}

					{steps.length === step && (
						<button
							className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
              hover:bg-blue1  
              bg-blue1 
              text-blue0 
              border duration-200 ease-in-out 
              border-blue1 transition"
							onClick={() =>
								postHandler({
									// Pass all the required form values here
									street,
									accessingInfo,
									title,
									description,
									roomType,
									photos,
									rentalRules,
									beds,
									bathrooms,
									bedrooms,
									selectedDates,
									price,
									additionalGuestPrice,
									accommodates,
									lat,
									lng,
									amenities,
									bed_type,
									// id,
									// thumbnailUrl,
									// mediumUrl,
									// price,
									// bathrooms,
									// bedrooms,
									// numberOfReviews,
									// reviewScoresRating, 
									// street,
									// lng,
									// lat,
									// amenities,
									hosts_id, 
									// beds,
									// name,
									// hostName, 
									// hostPictureUrl,
									// hostSince,
									// hostLocation,
									//hostAbout,
									// hostResponseTime,
									// hostResponseRate,
								})
							}
						>
							Post
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default NewListing;
