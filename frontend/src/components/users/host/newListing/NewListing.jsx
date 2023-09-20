import React, { useEffect, useState } from 'react';
import Stepper from './Stepper';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the cardId from the URL
import Swal from 'sweetalert2';
import { Description, Location, Prices, Dates, Details, Amenities } from './steps';
import useCloudinaryUpload from '/src/hooks/useCloudinaryUpload';

const NewListing = ({ hosts_id }) => {

	const navigate = useNavigate();

	// If is in edit mode url will be /newlistings/cardId..
	const { cardId } = useParams(); // Extract cardId from the URL
	const editMode = !!cardId; // Convert cardId to a boolean to determine if you're in editMode
	let cardProps = null;
	if (editMode) {
	  cardProps = JSON.parse(localStorage.getItem("cardProps"));
	}

	const [step, setStep] = useState(1);
	const [steps, setSteps] = useState([
		'Location',
		'Description',
		'Details',
		'Amenities',
		'Dates',
		'Prices'
	]);
	function nextStepHandler() {setStep(step + 1);}
	function prevStepHandler() {setStep(step - 1);}



	// Location Step State
	const [street, setstreet] = useState(editMode? cardProps.street : "");
	const [accessing_info, setAccessingInfo] = useState(editMode? cardProps.accessing_info : "");
	const [latitude, setLatitude] = useState(editMode? cardProps.latitude : "");
	const [longitude, setLongitude] = useState(editMode? cardProps.longitude : "");
	// Extract values from cardProps.street if in editMode
	let initialRoad = '';
	let initialCity = '';
	let initialPostCode = '';
	let initialCountry = '';
	if (editMode && cardProps.street) {
		const parts = cardProps.street.split(',').map(part => part.trim());
		if (parts.length === 4) {
			initialRoad = parts[0];
			initialCity = parts[1];
			initialPostCode = parts[2];
			initialCountry = parts[3];
		}
	}
	const [road, setRoad] = useState(initialRoad);
	const [city, setCity] = useState(initialCity);
	const [postcode, setPostCode] = useState(initialPostCode);
	const [country, setCountry] = useState(initialCountry);
	console.log("cardprops:")
	console.log(cardProps)

	// Description Step State
	const [name, setName] = useState(editMode ? cardProps.name : '');
	const [description, setdescription] = useState(editMode ? cardProps.description : '');
	const [roomType, setroomType] = useState(editMode ? cardProps.roomType : '');
	const [photos, setPhotos] = useState(editMode ? cardProps.mediumUrl.split(',') : []);


	const rentalRulesList = [
		'Acceptable for pets',
		'Smoking allowed',
		'Events or parties allowed',
	];
	// Extract rental rules from cardProps if in editMode
	let initialRentalRules = new Set();

	if (editMode && cardProps.rentalRules) {
		if (Array.isArray(cardProps.rentalRules)) {
			initialRentalRules = new Set(cardProps.rentalRules);
		} else if (typeof cardProps.rentalRules === 'string') {
			const strippedString = cardProps.rentalRules.substring(1, cardProps.rentalRules.length - 1);
			const rulesArray = strippedString.split(',').map(rule => rule.trim());
			initialRentalRules = new Set(rulesArray);
		}
	}
	const [rentalRules, setRentalRules] = useState(initialRentalRules);
	
	// Details Step State
	const [beds, setBeds] = useState(editMode ? cardProps.beds : 0);
	const [bathrooms, setBathrooms] = useState(editMode ? cardProps.bathrooms : 0);
	const [bedrooms, setBedrooms] = useState(editMode ? cardProps.bedrooms : 0);
	const [bed_type, setBedType] = useState(editMode ? cardProps.bed_type : '');
	const [size, setSize] = useState(editMode ? cardProps.size : 0);

	// Dates Step State
	const [hostArrivalDate, setHostArrivalDate] = useState(editMode ? cardProps.hostArrivalDate : new Date());
	const [hostDepartureDate, setHostDepartureDate] = useState(editMode ? cardProps.hostDepartureDate : new Date());
	useEffect(() => {
		if (editMode && cardId) {
			fetch(`https://localhost:8443/api/v1/bookings/byListing/${cardId}?trueBooking=0`)
			.then(response => response.json())
			.then(data => {
				const dates = data.map(booking => {
					// Convert the string dates from the API into JavaScript Date objects
					const arrivalDate = new Date(booking.arrival_date);
					const departureDate = new Date(booking.departure_date);
	
					// Format the dates into the desired string format
					const formattedArrival = `${arrivalDate.getMonth() + 1}/${arrivalDate.getDate()}/${arrivalDate.getFullYear()}`;
					const formattedDeparture = `${departureDate.getMonth() + 1}/${departureDate.getDate()}/${departureDate.getFullYear()}`;
	
					// Return the combined string
					return `${formattedArrival} - ${formattedDeparture}`;
				});
				setSelectedDates(dates);
			})
			.catch(error => {
				console.error("Error fetching bookings:", error);
			});
		}
	}, [editMode]);
	
	const [selectedDates, setSelectedDates] = useState(editMode ? [] : []);
	const [minimum_nights, setminimum_nights] = useState(editMode ? cardProps.minimum_nights : 1);
	console.log("Minimum nights from details: ", minimum_nights);

	// Prices Step State
	const [price, setprice] = useState(editMode ? cardProps.price : 0);
	const [additionalGuestPrice, setAdditionalGuestPrice] = useState(cardProps.price_per_additional_guest ? cardProps.price_per_additional_guest : 0);
	const [accommodates, setaccommodates] = useState(editMode ? cardProps.accommodates : 1);

	// Amenities Step State
		// Extract rental rules from cardProps if in editMode
	let initialAmenities = new Set();

	if (editMode && cardProps.amenities) {
		if (Array.isArray(cardProps.amenities)) {
			initialAmenities = new Set(cardProps.amenities);
		} else if (typeof cardProps.amenities === 'string') {
			const strippedString = cardProps.amenities.substring(1, cardProps.amenities.length - 1);
			const rulesArray = strippedString.split(',').map(rule => rule.trim());
			initialAmenities = new Set(rulesArray);
		}
	}
	const [amenities, setAmenities] = useState(initialAmenities); // Initialize as a Set based on cardProps if in editMode

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



	const { uploadedUrls, handleUpload } = useCloudinaryUpload();

	const parseDates = (datesString) => {
		const [arrival, departure] = datesString.split(' - ');
		return { arrival, departure };
	};

	// For not available dates
	const insertBooking = async (arrival, departure, cardId) => {
		let user_id = parseInt(localStorage.getItem('loggedInUserId'));
		
		const booking = {
			hosts_id: user_id,
			renters_id: user_id,
			listings_id: cardId,
			arrival_date: new Date(arrival),
			departure_date: new Date(departure),
			trueBooking: 0
		};
		console.log("booking: " , booking);
		const response = await fetch('https://localhost:8443/api/v1/insertBooking', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(booking)
		});
		if (!response.ok) {
			// Handle error
			console.error('Failed to insert booking');
		}
	};


	const handleSubmission = async (values) => {
		if (editMode) {
			await updateHandler(values);
		} else {
			await postHandler(values);
		}
	};

	const deleteBookings = async (hostsId) => {
		try {
			const response = await fetch(`https://localhost:8443/api/v1/deleteBookings/${hostsId}?trueBooking=0`, {
				method: 'DELETE',
			});
			return response.ok;
		} catch (error) {
			console.error("Error deleting bookings:", error);
			return false;
		}
	};
	

	const updateHandler = async (values) => {

        // Separate photos into URLs and files
        const existingPhotoUrls = photos.filter(photo => typeof photo === 'string');
        const newPhotosToUpload = photos.filter(photo => typeof photo !== 'string');

        // Upload new photos to Cloudinary
        let newUploadedUrls = await handleUpload(newPhotosToUpload);
        if (typeof newUploadedUrls === 'string') {
            newUploadedUrls = [newUploadedUrls];
        }
        // Combine existing URLs with new URLs
        const allPhotoUrls = [...existingPhotoUrls, ...newUploadedUrls];

		try {
			const amenities = Array.from(values.amenities);
			const requestBody = {
				...values,
				latitude: parseFloat(values.latitude),
				longitude: parseFloat(values.longitude),
				hosts_id: localStorage.getItem('loggedInUserId'),
				amenities: `{${amenities.join(',')}}`,
				thumbnail_url: allPhotoUrls[0],
				medium_url: allPhotoUrls.join(','),
				rentalRules: `{${Array.from(rentalRules).join(',')}}`,
				price_per_additional_guest : additionalGuestPrice,
				id:cardId,
			};
			console.log(JSON.stringify(requestBody));

			const response = await fetch(`https://localhost:8443/updateCard/${cardId}`, { // Assuming your update endpoint is like this
				method: 'PUT', // Typically, updates use the PUT method
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});
	
			if (response.ok) {

				// Delete old unavailable dates
				const hostsId = localStorage.getItem('loggedInUserId');
				const deleteSuccess = await deleteBookings(hostsId);
				if (!deleteSuccess) {
					throw new Error("Failed to delete old bookings.");
				}

				// Insert new bookings
				if (selectedDates) {
					values.selectedDates.forEach(dateString => {
						const { arrival, departure } = parseDates(dateString);
						insertBooking(arrival, departure, cardId);
					});
				}

				Swal.fire({
					title: 'Updated!',
					text: 'Your card has been successfully updated.',
					icon: 'success',
					confirmButtonText: 'OK'
				}).then(() => {
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
				text: 'An error occurred while updating your card.',
				icon: 'error',
				confirmButtonText: 'OK'
			});
		}
	};
	

	const postHandler = async (values) => {
		const uploadedImageUrls = await handleUpload(photos);
		try {
			// Create an array from the Set of selected amenities
			const amenities = Array.from(values.amenities);

			const requestBody = {
				...values,
				latitude: parseFloat(values.latitude),
				longitude: parseFloat(values.longitude),
				hosts_id: localStorage.getItem('loggedInUserId'),
				amenities: `{${amenities.join(',')}}`,
				thumbnail_url: Array.isArray(uploadedImageUrls) ? uploadedImageUrls[0] : uploadedImageUrls,
				medium_url: Array.isArray(uploadedImageUrls) ? uploadedImageUrls.join(',') : uploadedImageUrls,
				rentalRules: `{${Array.from(rentalRules).join(',')}}`,
				price_per_additional_guest : additionalGuestPrice,
			};

			console.log('Request JSON:', JSON.stringify(requestBody, null, 2)); // Log the JSON that will be sent to the server

			const response = await fetch('https://localhost:8443/insertCard', {
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
				console.log("data:", responseData);
				console.log("cardId: ", cardId);
				//Insert unavailable dates as bookings
				if(selectedDates){
					values.selectedDates.forEach(dateString => {
						const { arrival, departure } = parseDates(dateString);
						insertBooking(arrival, departure, cardId);
					});
				}

				Swal.fire({
					title: 'Welcome !',
					text: 'Your card has been successfully posted.',
					icon: 'success',
					confirmButtonText: 'OK'
				}).then(() => {
					const cardData = {
						/*id: cardId,
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
						roomType: values.roomType,*/
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



	const [isFormComplete, setIsFormComplete] = useState(editMode);

	useEffect(() => {
		setIsFormComplete(false);
		console.log(selectedDates)
	}, [step]);



	return (
		<div className="p-5">
			<Stepper steps={steps} currentStep={step} />

			<div className="font font-semibold text-lg flex justify-center p-10">
				{step === 1 && (
						<Location
						street={street}
						setstreet={setstreet}
						accessingInfo={accessing_info}
						setAccessingInfo={setAccessingInfo}
						setIsFormComplete={setIsFormComplete}
						latitude={latitude}
						longitude={longitude}
						setLatitude={setLatitude}
						setLongitude={setLongitude}
						country = {country}
						setCountry = {setCountry} // Default to Athens, Greece
						postcode = {postcode} 
						setPostCode = {setPostCode}
						city = {city}
						setCity = {setCity}
						road = {road}
						setRoad = {setRoad}
					/>
				)}

				{step === 2 && (
					<Description
						title={name} // Use nameNew if cardProps has data, otherwise use name
						setTitle={setName}
						description={description}
						setdescription={setdescription}
						roomType={roomType}
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
						amenitiesList={amenitiesList}
						setIsFormComplete={setIsFormComplete}
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
						isFormComplete ? (
							<button
								className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
								hover:bg-blue1  
								bg-blue1 
								text-blue0 
								border duration-200 ease-in-out 
								border-blue1 transition"
								onClick={() =>
									handleSubmission({
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
										rentalRules,
									}

									)
								}
							>
								Post
							</button>)
							: (
								<button
									className="text-base  ml-2  flex justify-center px-4 py-2 rounded font-bold cursor-not-allowed bg-gray-50 
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
