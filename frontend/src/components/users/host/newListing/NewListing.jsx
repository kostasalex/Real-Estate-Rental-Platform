import React, { useEffect, useState } from 'react';
import Stepper from './Stepper';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the cardId from the URL
import Swal from 'sweetalert2';
import { Description, Location, Prices, Dates, Details, Amenities } from './steps';
import useCloudinaryUpload from '/src/hooks/useCloudinaryUpload';

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

	const { uploadedUrls, handleUpload } = useCloudinaryUpload();


	const postHandler = async (values) => {
		const uploadedImageUrls = await handleUpload(photos);
		try {
			// Create an array from the Set of selected amenities
			const amenities = Array.from(values.amenities);

			// Generate a random cardId

			//console.log("the lat value is: " + values.latitude);
			const requestBody = {
				...values,
				latitude: parseFloat(values.latitude),
				longitude: parseFloat(values.longitude),
				hosts_id: localStorage.getItem('loggedInUserId'),
				amenities: `{${amenities.join(',')}}`,
				thumbnail_url: Array.isArray(uploadedImageUrls) ? uploadedImageUrls[0] : uploadedImageUrls,
				medium_url: Array.isArray(uploadedImageUrls) ? uploadedImageUrls.join(',') : uploadedImageUrls,
				rentalRules: `{${Array.from(rentalRules).join(',')}}`,

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
				//console.log('Response Data:', responseData); // Log the response data
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
						longitude: values.longitude,
						latitude: values.latitude,
						amenities: values.amenities,
						hosts_id: hosts_id, // Include the hosts_id as hosts_id in the cardData object
						beds: values.beds,
						name: values.name,
						roomType: values.roomType,
					};

					// Handle the cardData object as needed, e.g., store it in state or pass it to a parent component
					//console.log(cardData);
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
	const [accessing_info, setAccessingInfo] = useState('');
	const [latitude, setLatitude] = useState(null); // Add lat state
	const [longitude, setLongitude] = useState(null); // Add lng state
	const [country, setCountry] = useState(''); // Default to Athens, Greece
	const [postcode, setPostCode] = useState('');
	const [city, setCity] = useState('');
	const [road, setRoad] = useState('');

	// Description Step State
	const [name, setName] = useState('');
	const [description, setdescription] = useState('');
	const [roomType, setroomType] = useState('');
	const [minimum_nights, setminimum_nights] = useState(1);
	const [photos, setPhotos] = useState([]);

	const rentalRulesList = [
		'Acceptable for pets',
		'Smoking allowed',
		'Events or parties allowed',
	];

	const [rentalRules, setRentalRules] = useState(new Set());

	// Details Step State
	const [beds, setBeds] = useState(0);
	const [bathrooms, setBathrooms] = useState(0);
	const [bedrooms, setBedrooms] = useState(0);
	const [bed_type, setBedType] = useState('');
	const [size, setSize] = useState(0);

	// Dates Step State
	const [hostArrivalDate, setHostArrivalDate] = useState(); // Set default value to the current date
	const [hostDepartureDate, setHostDepartureDate] = useState(); // Set default value to the current date
	const [selectedDates, setSelectedDates] = useState('');

	// Prices Step State
	const [price, setprice] = useState(0);
	const [additionalGuestPrice, setAdditionalGuestPrice] = useState(0);
	const [accommodates, setaccommodates] = useState(1);

	// Amenities Step State
	const [amenities, setAmenities] = useState(new Set()); // Initialize as a Set
	const amenitiesList = [
		'TV',
		'Wireless Internet',
		'Air Conditioning',
		'Kitchen',
		'Pool',
		'Parking',
		'Elevator',
		'Buzzer/Wireless Intercom',
		'Heating',
		'Washer'
	];

	useEffect(() => {
		// console.log("from new listings")
		// console.log(latitude)
		// console.log(longitude)
	}, [latitude, longitude]);


	//Editing listing
	const cardProps = JSON.parse(localStorage.getItem("cardProps"));
	const [id] = useState(cardProps.id);
	const [nameEdit] = useState(cardProps.name);
	const [priceEdit] = useState(cardProps.price);
	const [roomTypeEdit] = useState(cardProps.roomType);
	const [bedsEdit] = useState(cardProps.beds);
	const [accommodatesEdit] = useState(cardProps.accommodates);
	const [bathroomsEdit] = useState(cardProps.bathrooms);
	const [bedroomsEdit] = useState(cardProps.bedrooms);
	const [bed_typeEdit] = useState(cardProps.bed_type);
	const [numberOfReviewsEdit] = useState(cardProps.numberOfReviews);
	const [reviewScoresRatingEdit] = useState(cardProps.reviewScoresRating);
	const [streetEdit] = useState(cardProps.street);
	const [sizeEdit] = useState(cardProps.size);
	const [descriptionEdit] = useState(cardProps.description);
	const [longitudeEdit] = useState(cardProps.longitude);
	const [latitudeEdit] = useState(cardProps.latitude);
	const [amenitiesEdit, setAmenitiesEdit] = useState(new Set(cardProps.amenities)); // Initialize as a Set

	console.log(cardProps)

	return (
		<div className="p-5">
			<Stepper steps={steps} currentStep={step} />

			<div className="font font-semibold text-lg flex justify-center p-10">
				{step === 1 && (
					<Location
						street={cardProps ? streetEdit : street}
						setstreet={setstreet}
						accessingInfo={accessing_info}
						setAccessingInfo={setAccessingInfo}
						setIsFormComplete={setIsFormComplete}
						latitude={cardProps ? latitudeEdit : latitude}
						longitude={cardProps ? longitudeEdit : longitude}
						setLatitude={setLatitude}
						setLongitude={setLongitude}
						country={country}
						setCountry={setCountry} // Default to Athens, Greece
						postcode={postcode}
						setPostCode={setPostCode}
						city={city}
						setCity={setCity}
						road={road}
						setRoad={setRoad}
					/>
				)}

				{step === 2 && (
					<Description
						title={cardProps ? nameEdit : name} // Use nameNew if cardProps has data, otherwise use name
						setTitle={setName}
						description={cardProps ? descriptionEdit : description}
						setdescription={setdescription}
						roomType={cardProps ? roomTypeEdit : roomType}
						setroomType={setroomType}
						photos={photos}
						setPhotos={setPhotos}
						rentalRules={rentalRules}
						setRentalRules={setRentalRules}
						setIsFormComplete={setIsFormComplete}
						rentalRulesList={rentalRulesList}
					/>
				)}

				{step === 3 && (
					<Details
						beds={cardProps ? bedsEdit : beds}
						setBeds={setBeds}
						bathrooms={cardProps ? bathroomsEdit : bathrooms}
						setBathrooms={setBathrooms}
						bedrooms={cardProps ? bedroomsEdit : bedrooms}
						setBedrooms={setBedrooms}
						bed_type={cardProps ? bed_typeEdit : bed_type}
						setBedType={setBedType}
						size={cardProps ? sizeEdit : size}
						setSize={setSize}
						setIsFormComplete={setIsFormComplete}
					/>
				)}

				{step === 4 && (
					<Amenities
						amenities={cardProps ? amenitiesEdit : amenities}
						setAmenities={setAmenitiesEdit} // Corrected the prop name to match the component's state
						amenitiesList={amenitiesList}
						setIsFormComplete={setIsFormComplete} // Pass isFormComplete as a prop
						cardPropsAmenities={cardProps ? cardProps.amenities : ''} // Pass cardProps.amenities as a prop
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
						minimum_nights={minimum_nights}
						setminimum_nights={setminimum_nights}
					/>
				)}

				{step === 6 && (
					<Prices
						price={cardProps ? priceEdit : price}
						setprice={setprice}
						additionalGuestPrice={additionalGuestPrice}
						setAdditionalGuestPrice={setAdditionalGuestPrice}
						accommodates={cardProps ? accommodatesEdit : accommodates}
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
						isFormComplete ? (
							<button
								className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
								hover:bg-blue1  
								bg-blue1 
								text-blue0 
								border duration-200 ease-in-out 
								border-blue1 transition"
								onClick={() =>
									postHandler({
										street,
										accessing_info,
										minimum_nights,
										name,
										description,
										roomType,
										photos,
										beds,
										bathrooms,
										bedrooms,
										selectedDates,
										price,
										additionalGuestPrice,
										accommodates,
										bed_type,
										latitude,
										longitude,
										hosts_id,
										size,
										amenities,
										rentalRules
									}

									)
								}
							>
								Post
							</button>)
							: (
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
									Post
								</button>)


					)}
				</div>
			</div>
		</div>
	);
};

export default NewListing;
