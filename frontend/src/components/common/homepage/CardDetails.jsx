import React from 'react';
import { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DatePicker } from '@mui/x-date-pickers';
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs'; // Import dayjs
import { Rating } from "@material-tailwind/react";

function CardDetails() {

	const location = useLocation();
	const navigate = useNavigate();

	const cardProps = JSON.parse(localStorage.getItem("cardProps"));
	const [arrivalDate, setArrivalDate] = useState(null);
	const [departureDate, setDepartureDate] = useState(null);
	const [numDaysStayed, setNumDaysStayed] = useState(0);
	const [newReview, setNewReview] = useState(null)

	useEffect(() => {
		if (arrivalDate && departureDate) {
			const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
			const numDays = Math.round(Math.abs((arrivalDate - departureDate) / oneDay));
			setNumDaysStayed(numDays);
		} else {
			setNumDaysStayed(0);
		}
	}, [arrivalDate, departureDate]);

	const [host, setHost] = useState({});

	useEffect(() => {
		fetch(`https://localhost:8443/api/v1/users/${cardProps.hosts_id}`)
			.then((response) => response.json())
			.then((data) => setHost(data))
			.catch((error) => console.error(error));

	}, [cardProps.hosts_id]);



	const [id] = useState(cardProps.id);
	const [name] = useState(cardProps.name);
	const [thumbnailUrl] = useState(cardProps.thumbnailUrl);
	const [price] = useState(cardProps.price);
	const [roomType] = useState(cardProps.roomType);
	const [beds] = useState(cardProps.beds);
	const [accommodates] = useState(cardProps.accommodates);
	const [bathrooms] = useState(cardProps.bathrooms);
	const [bedrooms] = useState(cardProps.bedrooms);
	const [bed_type] = useState(cardProps.bed_type);
	const [numberOfReviews] = useState(cardProps.numberOfReviews);
	const [reviewScoresRating] = useState(cardProps.reviewScoresRating);
	const [street] = useState(cardProps.street);
	const [description] = useState(cardProps.description);
	const [accessingInfo] = useState(cardProps.accessing_info);
	const [pricePerAdditionalGuest] = useState(cardProps.price_per_additional_guest);
	const [minimumNights] = useState(cardProps.minimum_nights);
	const [hostsId] = useState(cardProps.hosts_id);
	const [size] = useState(cardProps.size);
	const [amenities] = useState(cardProps.amenities);
	const [rentalRules] = useState(cardProps.rentalRules);

	const [lng] = useState(cardProps.longitude);
	const [lat] = useState(cardProps.latitude);

	const [people, setPeople] = useState(1);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenHost, setIsOpenHost] = useState(false);
	const [isFormComplete, setIsFormComplete] = useState(false);
	const [reviews, setReviews] = useState([]);

	const maxRating = 100;
	const targetMaxRating = 5;
	const convertedRating = (reviewScoresRating / maxRating) * targetMaxRating;
	const roundedRating = Math.round(convertedRating * 10) / 10;

	let amenitiesArray = [];
	if (amenities) {
		amenitiesArray = amenities.replace(/[\{\}]/g, '').split(',');
	}

	let rentalRulesArray = [];
	if (rentalRules) {
		rentalRulesArray = rentalRules.replace(/[\{\}]/g, '').split(',');
	}

	const [totalPrice, setTotalPrice] = useState(0);

	const openDialog = () => {
		setIsOpen(true);
	};

	const closeDialog = () => {
		setIsOpen(false);
	};

	const [selectedRating, setSelectedRating] = useState(0); // Initialize with 0 stars
	const postReview = async (cardId) => {
		// Check if the review is not empty
		if (newReview.trim() === '') {
			Swal.fire({
				title: 'Review must not be empty',
				html: 'You have to write a review before posting it.',
				icon: 'info',
				confirmButtonText: 'Review',
				showCancelButton: false,
				cancelButtonText: 'Close',
				showCloseButton: true,
			})
			return;
		}
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		// Add 1 to the month because getMonth() returns 0-based month (0 = January)
		const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits
		const day = currentDate.getDate().toString().padStart(2, '0'); // Ensure 2 digits

		const formattedDate = `${year}-${month}-${day}`;

		let user_id = parseInt(localStorage.getItem('loggedInUserId'));
		const review = {
			hostId: hostsId,
			comment: newReview,
			renterId: user_id,
			listingId: cardId,
			date: formattedDate,
			rating: selectedRating
		};
		console.log("review: ", review);
		try {
			const response = await fetch('https://localhost:8443/reviews', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(review),
			});

			if (response.ok) {
				// Handle a successful response here, e.g., show a success message and navigate to a confirmation page.
				Swal.fire({
					title: 'Review posted successfuly!',
					text: 'The host is notified about your review.',
					icon: 'success',
					confirmButtonText: 'OK',
				}).then(() => {
					window.location.reload()
				});
			} else {
				// Handle errors from the backend API, e.g., show an error message.
				Swal.fire({
					title: 'Review failed!',
					text: 'There was an error processing your review. Please try again later.',
					icon: 'error',
					confirmButtonText: 'OK',
				});
			}
		} catch (error) {
			// Handle network errors, e.g., show a generic error message.
			console.error('Error making review:', error);
			Swal.fire({
				title: 'Network Error',
				text: 'There was a problem connecting to the server. Please check your internet connection and try again.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		}
	};


	const openDialogHost = async () => {
		if (localStorage.getItem('loggedInUserType')) {
			setIsOpenHost(true);
			let user_id = parseInt(localStorage.getItem('loggedInUserId'));

			try {
				const response = await fetch(`https://localhost:8443/messages/user/${user_id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (response.ok) {
					// Parse the response JSON
					const responseData = await response.json();

					// Extract the content from each message and update the questions state
					const extractedQuestions = responseData.map(message => message.content);

					setQuestions(extractedQuestions);
					setQuestion('');
				} else {
					// Handle the case where the response is not OK (e.g., error handling)
					console.error('Error sending message:', response.statusText);
					Swal.fire({
						title: 'Error',
						text: 'Failed to send message. Please try again later.',
						icon: 'error',
						confirmButtonText: 'OK',
					});
				}
			} catch (error) {
				console.error('Error sending message:', error);
				Swal.fire({
					title: 'Error',
					text: 'Failed to send message. Please try again later.',
					icon: 'error',
					confirmButtonText: 'OK',
				});
			}
		} else {
			// Handle the case where the user is not logged in
			Swal.fire({
				title: 'Login or Sign Up',
				html: 'You have to login or sign up before you can contact the host.',
				icon: 'info',
				confirmButtonText: 'Login',
				showCancelButton: true,
				cancelButtonText: 'Sign Up',
				showCloseButton: true,
			}).then((result) => {
				if (result.isConfirmed) {
					navigate('/login', { state: { from: location.pathname } });
				} else if (result.isDismissed && result.dismiss !== Swal.DismissReason.close) {
					navigate('/signup', { state: { from: location.pathname } });
				}
			});
		}
	};



	const today = dayjs(); // Create a dayjs object for today's date
	const closeDialogHost = () => {
		setIsOpenHost(false);
	};
	useEffect(() => {
		if (arrivalDate && departureDate) {
			const numDaysStayed = dayjs(departureDate).diff(arrivalDate, 'day');
			const basePrice = parseFloat(price);

			if (people === 1) {
				setTotalPrice((numDaysStayed * basePrice).toFixed(2));
			} else {

				setTotalPrice(((numDaysStayed * basePrice) + pricePerAdditionalGuest).toFixed(2));
			}
		}
	}, [arrivalDate, departureDate, people, price]);

	const handleIncrease = () => {
		if (accommodates != null && people < accommodates) {
			setPeople(people + 1);
		}
		else {
			setPeople(1);
		}
	};

	const handleDecrease = () => {
		if (people > 1) {
			setPeople(people - 1);
		}
	};


	const postHandler = async (arrival, departure, cardId) => {
		if (localStorage.getItem('loggedInUserType')) {
			let user_id = parseInt(localStorage.getItem('loggedInUserId'));

			const newArrival = new Date(arrival);
			newArrival.setDate(newArrival.getDate() + 1); // Add one more day

			const newDeparture = new Date(departure);
			newDeparture.setDate(newDeparture.getDate() + 1); // Add one more day

			const isoArrivalDate = newArrival.toISOString().split("T")[0];
			const isoDepartureDate = newDeparture.toISOString().split("T")[0];
			const availabilityCheck = {
				listings_id: cardId,
				arrival_date: isoArrivalDate,
				departure_date: isoDepartureDate,
			};
			const numNights = dayjs(departure).diff(arrival, 'day');
			console.log("departureDate " + departureDate + " isoDepartureDate " + isoDepartureDate);
			if (numNights < minimumNights) {
				Swal.fire({
					title: 'Reservation failed!',
					text: `The minimum stay for this property is ${minimumNights} nights.`,
					icon: 'error',
					confirmButtonText: 'OK',
				});
				return; // Don't proceed with the reservation.
			}
			try {
				// Check availability first
				const availabilityResponse = await fetch('https://localhost:8443/api/v1/bookings/checkAvailability', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(availabilityCheck),
				});


				if (!availabilityResponse.ok) {
					// Handle the case where the dates are not available.
					Swal.fire({
						title: 'Reservation failed!',
						text: 'The selected dates are not available for booking.',
						icon: 'error',
						confirmButtonText: 'OK',
					});
					return; // Don't proceed with the reservation.
				}

				// If the dates are available, proceed with the reservation.
				const booking = {
					hosts_id: hostsId,
					renters_id: user_id,
					listings_id: cardId,
					arrival_date: isoArrivalDate,
					departure_date: isoDepartureDate,
					trueBooking: 0,
				};
				const response = await fetch('https://localhost:8443/api/v1/insertBooking', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(booking),
				});

				if (response.ok) {
					// Handle a successful response here, e.g., show a success message and navigate to a confirmation page.
					Swal.fire({
						title: 'Reservation successful!',
						text: 'The host is notified about your booking.',
						icon: 'success',
						confirmButtonText: 'OK',
					}).then(() => {
						// Navigate to a confirmation page or perform any other desired action.
						//window.location.reload();
					});
				} else {
					// Handle errors from the backend API, e.g., show an error message.
					Swal.fire({
						title: 'Reservation failed!',
						text: 'There was an error processing your reservation. Please try again later.',
						icon: 'error',
						confirmButtonText: 'OK',
					});
				}
			} catch (error) {
				// Handle network errors, e.g., show a generic error message.
				console.error('Error making reservation:', error);
				Swal.fire({
					title: 'Network Error',
					text: 'There was a problem connecting to the server. Please check your internet connection and try again.',
					icon: 'error',
					confirmButtonText: 'OK',
				});
			}

		} else {
			Swal.fire({
				title: 'Login or Sign Up',
				html: 'You have to login or sign up before you can contact the host.',
				icon: 'info',
				confirmButtonText: 'Login',
				showCancelButton: true,
				cancelButtonText: 'Sign Up',
				showCloseButton: true,
			}).then((result) => {
				if (result.isConfirmed) {
					navigate('/login', { state: { from: location.pathname } });  // Pass current page as state
				} else if (result.isDismissed && result.dismiss !== Swal.DismissReason.close) {
					navigate('/signup', { state: { from: location.pathname } });  // Pass current page as state
				}
			});
		}

	};

	useEffect(() => {
		if (accommodates && arrivalDate && departureDate)
			setIsFormComplete(true);
		else
			setIsFormComplete(false);
	}, [accommodates, arrivalDate, departureDate]);

	useEffect(() => {
		fetch('https://localhost:8443/reviews')
			.then((response) => response.json())
			.then((data) => {
				const filteredReviews = data.filter((review) => cardProps.id === review.listingId);
				setReviews(filteredReviews);
			})
			.catch((error) => {
				console.error('Error fetching reviews:', error);
			});
	}, []);


	const mediumUrls = cardProps.mediumUrl.split(',');
	const [question, setQuestion] = useState('');
	const [questions, setQuestions] = useState([]);
	console.log(questions);
	const handleSubmit = async (e) => {
		//console.log(hostsId)
		e.preventDefault();
		if (question.trim() !== '') {
			setQuestions([question, ...questions]);
			setQuestion('');
		}
		try {
			const response = await fetch('https://localhost:8443/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					senderId: localStorage.getItem('loggedInUserId'),
					recipientId: hostsId, //! Need host id to send 
					content: question,
				}),
			});

			if (response.ok) {
				Swal.fire({
					title: 'Message sent!',
					text: 'Your message has been sent to the host.',
					icon: 'success',
					confirmButtonText: 'OK',
				}).then(() => {
					window.location.reload()
				});
			} else {
				throw new Error('Failed to send message');
			}
		} catch (error) {
			console.error('Error sending message:', error);
			Swal.fire({
				title: 'Error',
				text: 'Failed to send message. Please try again later.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		}
	};


	return (

		<div className="mx-auto lg:px-6 md:px-4 px-2 md:py-8 py-4">
			{/* header title-reviews-road */}
			<div>
				<ul className="block md:grid grid-cols-2 gap-4">
					<div>
						<p className="mb-4 text-3xl text-center leading-none tracking-tight text-gray-900">{name}</p>
					</div>

					<div className="text-base text-center md:text-left">
						<div className="flex items-center justify-center md:justify-start">
							<div className="inline text-yellow-500 inline">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
							</div>
							<p className="inline px-2">{roundedRating} ({numberOfReviews} Reviews)</p>
						</div>
						{/* Add padding to the address */}
						<p className="text-center md:text-left mt-2 md:mt-0 md:pl-4">{street}</p>
					</div>
				</ul>
			</div>


			{/* Main Content */}
			<div className="grid gap-4">
				<div className="block md:grid grid-cols-2 gap-4">
					{/* Center the main image on small screens */}
					<div className="text-center md:text-left">
						<button onClick={openDialog}>
							<img className="h-56 max-w-full rounded-lg hover:opacity-60 sm:h-96 mx-auto md:mx-0" src={thumbnailUrl} alt="" />
						</button>
					</div>
					<div className="flex flex-col justify-center">
						<p className="mb-4 text-3xl text-center md:text-left leading-none tracking-tight text-gray-900">About this place</p>
						<p className="text-center md:text-left ">{description}</p>
					</div>
				</div>

				{/* Rest of images */}
				<div className="block md:grid grid-cols-5 gap-4">
					{/* Map through the array of image URLs and display them */}
					{mediumUrls.map((imageUrl, index) => (
						<div key={index}>
							<button onClick={openDialog}>
								<img className="h-auto max-w-full rounded-lg hover:opacity-60" src={imageUrl} alt="" />
							</button>
						</div>
					))}
					<div>
						<button onClick={openDialog}><img className="mb-5 h-auto max-w-full rounded-lg hover:opacity-60" src={mediumUrls[2]} alt="" /></button>
						<div>
							<button onClick={openDialog} className="float-right flex flex-row  items-center  justify-end shadow-xl xl:mt-0 mt-20 bg-blue1 rounded-xl px-2 py-1 transition duration-300 transform hover:translate-y--2 text-white text-lg duration-300 transform hover:translate-y-2">See all photos</button>
							{isOpen && (
								<Dialog onClose={closeDialog}>
									<ul className="">
										<li>
											<img className="my-10 rounded-lg" src={thumbnailUrl} alt="" />
										</li>
										<li>
											<img className="my-10 rounded-lg" src={mediumUrls[0]} alt="" />
										</li>
										<li>
											<img className="my-10 rounded-lg" src={mediumUrls[1]} alt="" />
										</li>
										<li>
											<img className="my-10 rounded-lg" src={mediumUrls[2]} alt="" />
										</li>
									</ul>
								</Dialog>
							)}
						</div>
					</div>

				</div>
			</div>

			{/* Amenities and Reserve */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-10">
				<div>
					{/* amenities */}
					<div>
						<hr className="mb-10"></hr>
						<p className="text-center mb-10 text-2xl leading-none tracking-tight text-gray-900 sm:text-left">What this place offers</p>
						<p className="text-center mb-10 text-xl leading-none tracking-tight text-gray-900 sm:text-left">Size: {size}</p>

						{amenitiesArray && amenitiesArray.length > 0 && (
							<div>
								<p className="text-center mb-10 text-xl leading-none tracking-tight text-gray-900 sm:text-left">Amenities:</p>
								<ul className="grid grid-cols-2 gap-0">
									{amenitiesArray.map((amenity) => (
										<li className="text-center mb-2" key={amenity}><p>{amenity.replace(/"/g, '')}</p></li>
									))}
								</ul>
							</div>
						)}
						{rentalRulesArray && rentalRulesArray.length > 0 && (
							<div>
								<p className="text-center mb-10 text-xl leading-none tracking-tight text-gray-900 sm:text-left">Rental Rules:</p>
								<ul className="grid grid-cols-2 gap-0">
									{rentalRulesArray.map((rentalRule) => (
										<li className="text-center mb-2" key={rentalRule}><p>{rentalRule.replace(/"/g, '')}</p></li>
									))}
								</ul>
							</div>
						)}
					</div>

					{/* Host */}
					<div className="md:pt-5 md:pb-10">
						<ul>
							<button onClick={openDialogHost}>
								<li>
									<p className="text-center text-2xl leading-none tracking-tight text-gray-900 sm:text-left">
										This place is hosted by {host.firstName}
									</p>
								</li>
								<li>
									<div className="pt-10 float-left">
										<div className="max-w-lg mx-auto rounded-2xl shadow-lg hover:shadow-2xl transition duration-500">
											<div className="md:flex">
												<div className="md:flex-shrink-0">
													<img
														className="h-full w-full object-cover md:w-48"
														src={host.image_url}
														alt="Host Picture"
													/>
												</div>
												<div className="p-10">
													<div className="text-center pb-4 tracking-wide text-xl text-indigo-500 font-semibold">
														{host.firstName}
													</div>
													<div className="mt-4">
														<p
															className="text-center"
															style={{
																whiteSpace: "nowrap",
																overflow: "hidden",
																textOverflow: "ellipsis",
																maxWidth: "200px",
															}}
														>
															{host.hostAbout}
														</p>
														<p className="">Since: {host.hostSince}</p>
														<p className="">Listings: {host.hostListingCount}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</li>
							</button>
							{isOpenHost && (
								<Dialog onClose={closeDialogHost}> {/* Pass closeDialogHost as onClose prop */}
									<div className="block">
										<div className="md:flex-shrink-0">
											<img
												className="h-full w-full object-cover "
												src={host.image_url}
												alt="Host Picture"
											/>
										</div>
										<div className="p-10">
											<div className="text-center pb-4 tracking-wide text-xl text-indigo-500 font-semibold">
												{host.firstName}
											</div>
											<div className="mt-4">
												<p className="text-center">{host.hostAbout}</p>
												<p className="">Since: {host.hostSince}</p>
												<p className="">Location: {host.address}</p>
												<p className="">Listings: {host.hostListingCount}</p>
												<p className="mt-5">Response Time: {host.hostResponseTime}</p>
												<p className="">Response Rate: {host.hostResponseRate}</p>
											</div>
										</div>
									</div>
									<div>
										<form
											className="max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-20"
											onSubmit={handleSubmit}
										>
											<div className="px-3 mb-2 mt-2">
												<textarea
													placeholder={`Ask ${host.firstName} a question`}
													className="w-full placeholder-gray-500 bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
													value={question}
													onChange={(e) => setQuestion(e.target.value)}
												></textarea>
											</div>
											<div className="flex justify-end px-4">
												<button type="submit" className="px-2.5 py-1.5 rounded-md text-white text-sm bg-blue1">
													Comment
												</button>
											</div>
										</form>
										<p className="text-center my-3 text-xl leading-none tracking-tight text-gray-900 sm:text-left">Your questions</p>
										{questions.map((q, index) => (
											<div key={index} className="max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-4">
												<p>{q}</p>
											</div>
										))}
									</div>
								</Dialog>
							)}

						</ul>

					</div>

					{/* Map */}
					<div className="relative">
						<MapContainer center={[lat, lng]} zoom={13} style={{ height: '400px', width: '100%' }} className="z-0">
							<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
							<Marker position={[lat, lng]} />
						</MapContainer>
					</div>
				</div>

				{/* Reserve */}
				<div className="">
					<div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="block">
							<div className="md:flex-shrink-0">
								<img className=" w-full h-  " src={thumbnailUrl} alt="Room" />
							</div>

							<div className="p-10">
								<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{roomType}</div>
								<div className="mt-4">
									<span className="text-gray-500">Price per night:</span>
									<span className="font-semibold text-xl text-gray-900 ml-1">{price}</span>
								</div>
								<p className="mt-4 text-gray-500">{accommodates} guests · {bedrooms} bedroom(s) · {beds} bed(s) · {bathrooms} bathroom(s)</p>
								<p className="mt-4 text-gray-500">Minimum Nights: {minimumNights}</p>

								<div className="mt-4">
									{/* Accommodates */}
									<div className="flex items-center mb-4">
										<label className="text-indigo-500 pr-4" htmlFor="accommodates">
											Accommodates:
										</label>
										<div className="flex items-center border border-gray-300 rounded-md">
											<button
												className="px-3 py-1 bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none"
												onClick={handleDecrease}
											>
												-
											</button>
											<input
												className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-12 text-center border-r border-l border-gray-300 bg-gray-100"
												type="number"
												min="0"
												max={accommodates}
												value={people}
												onChange={(e) => setPeople(Number(e.target.value))}
											/>
											<button
												className="px-3 py-1 bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none"
												onClick={handleIncrease}
											>
												+
											</button>
										</div>
									</div>

									{/* Dates */}
									<div>
										<div className="my-5">
											<label className="text-indigo-500" htmlFor="arrivalDate">
												Arrival Date:
											</label>
											<DatePicker
												id="arrivalDate"
												selected={arrivalDate}
												onChange={(date) => setArrivalDate(date)}
												dateFormat="dd-MM-yyyy"
												placeholderText="Select arrival date"
												minDate={dayjs()} // To allow picking dates only after today
												maxDate={departureDate}
											/>
										</div>

										<div className="">
											<label className="text-indigo-500" htmlFor="departureDate">
												Departure Date:
											</label>
											<DatePicker
												id="departureDate"
												selected={departureDate}
												onChange={(date) => setDepartureDate(date)}
												dateFormat="dd-MM-yyyy"
												minDate={arrivalDate || dayjs()} // To ensure departure date is after arrival
												disabled={!arrivalDate}
												placeholderText="Select departure date"
											/>
										</div>
									</div>
								</div>


								{/* Total Price */}
								<div className="mt-4">
									<span className="text-gray-500">Total price:</span>
									<span className="font-semibold text-gray-900 text-xl ml-1">${totalPrice}</span>
								</div>
								<div className="mt-6">
									{
										(isFormComplete ?
											(<button className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
												hover:bg-blue1  
												bg-blue1 
												text-blue0 
												border duration-200 ease-in-out 
												border-blue1 transition"
												onClick={() => postHandler(arrivalDate, departureDate, id)}>Reserve</button>)
											:
											(<button className="text-base  ml-2  flex justify-center px-4 py-2 rounded font-bold cursor-not-allowed 
												bg-gray-50 
												text-gray-500
												border-2
												border-gray-500
												duration-200 ease-in-out 
												transition"
											>Reserve</button>)
										)}
								</div>

							</div>
						</div>
					</div>

					{/* Accessing Information */}
					<div className="block">
						<div>
							<p className="text-xl leading-none tracking-tight text-center pt-10 text-gray-900">Accessing Information</p>
						</div>
						<div className="md:grid md:grid-cols-2 md:gap-4">
							<div className="flex items-center justify-center">
								<div className="">
									<div className="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
										<div className="mt-4">
											<p className="mt-4 text-md text-gray-600">{accessingInfo}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>



			{/* Reviews */}
			<div className="block">
				<div>
					<p className="text-xl leading-none tracking-tight text-center text-gray-900">Reviews about this place</p>
				</div>
				<div className="">
					<div>
						<textarea
							maxLength={300}
							id="description"
							rows="4"
							className="block w-full p-2.5 py-5 mt-5 w-96 text-sm text-blue1 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Write your Review about this place!"
							value={newReview}
							onChange={(e) => setNewReview(e.target.value)}
						></textarea>
						<p className="text-md leading-none text-gray-900">Your Rating</p>
						<Rating
							unratedColor="blue"
							ratedColor="blue"
							value={selectedRating}
							onChange={(value) => setSelectedRating(value)}
						/>

						<button
							className="block mt-2 bg-blue1 text-white px-4 py-2 rounded-lg hover:bg-blue2 focus:outline-none"
							onClick={() => postReview(id)}
						>
							Post Review
						</button>

					</div>

				</div>
				{/* Reviews */}
				<div className="md:grid md:grid-cols-2 md:gap-4">
					{reviews.map(({ id, comment, date, hostId, listingId, rating, renterId }) => (
						<div key={id} className=" flex items-center justify-center">
							<div className="">
								<div className="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
									<link rel="icon" type="image/svg+xml" href="/src/assets/logosmall.png" />
									<div className="mt-4 flex items-center space-x-4 ">
										<div className="">
											<FaUser style={{ fontSize: '30px', color: '' }} />
										</div>
										<div className="text-sm font-semibold"> {renterId} • <span className="font-normal"> {date}</span></div>
									</div>
									<div className="mt-4">
										<p className="mt-4 text-md text-gray-600">{comment}</p>
									</div>
									<div className="mt-4">
										<p className="mt-4 text-md text-gray-600">Rating : {rating}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div >


	);
}

export default CardDetails;
