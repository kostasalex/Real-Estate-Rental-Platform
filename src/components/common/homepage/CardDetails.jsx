import React from 'react';
import { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DatePicker } from '@mui/x-date-pickers';
import Swal from "sweetalert2";
import Papa from "papaparse";
import { FaUser } from "react-icons/fa";

function CardDetails() {
	const cardProps = JSON.parse(localStorage.getItem("cardProps"));
	const [arrivalDate, setArrivalDate] = useState(null);
	const [departureDate, setDepartureDate] = useState(null);
	const [numDaysStayed, setNumDaysStayed] = useState(0);

	useEffect(() => {
		if (arrivalDate && departureDate) {
			const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
			const numDays = Math.round(Math.abs((arrivalDate - departureDate) / oneDay));
			setNumDaysStayed(numDays);
		} else {
			setNumDaysStayed(0);
		}
	}, [arrivalDate, departureDate]);


	const [id, setId] = useState(cardProps.id);
	const [name, setName] = useState(cardProps.name);
	const [thumbnail_url, setThumbnailUrl] = useState(cardProps.thumbnail_url);
	const [medium_url, setMediumUrl] = useState(cardProps.medium_url);
	const [price, setPrice] = useState(cardProps.price);
	const [roomType, setRoomType] = useState(cardProps.room_type);
	const [beds, setBeds] = useState(cardProps.beds);
	const [accommodates, setAccommodates] = useState(cardProps.accommodates);
	const [bathrooms, setBathrooms] = useState(cardProps.bathrooms);
	const [bedrooms, setBedrooms] = useState(cardProps.bedrooms);
	const [bedType, setBedType] = useState(cardProps.bed_type);
	const [numberOfReviews, setNumberOfReviews] = useState(cardProps.number_of_reviews);
	const [reviewScoresRating, setReviewScoresRating] = useState(cardProps.review_scores_rating);
	const [street, setStreet] = useState(cardProps.street);
	const [description, setDescription] = useState(cardProps.description);

	const [hostName, setHostName] = useState(cardProps.host_name);
	const [hostPictureUrl, setHostPictureUrl] = useState(cardProps.host_picture_url);
	const [hostSince, setHostSince] = useState(cardProps.host_since);
	const [hostLocation, setHostLocation] = useState(cardProps.host_location);
	const [hostAbout, setHostAbout] = useState('');
	const [hostResponseTime, setHostResponseTime] = useState(cardProps.host_response_time);
	const [hostResponseRate, setHostResponseRate] = useState(cardProps.host_response_time);
	const [hostListingCount, setHostListingCount] = useState(cardProps.host_listings_count);

	const [amenities, setAmenities] = useState(cardProps.amenities);

	const [longitude, setLongitude] = useState(cardProps.longitude);
	const [latitude, setLatitude] = useState(cardProps.latitude);

	const [people, setPeople] = useState(1);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenHost, setIsOpenHost] = useState(false);
	const [isFormComplete, setIsFormComplete] = useState(false);
	const [reviews, setReviews] = useState([]);

	const maxRating = 100;
	const targetMaxRating = 5;
	const convertedRating = (reviewScoresRating / maxRating) * targetMaxRating;
	const roundedRating = Math.round(convertedRating * 10) / 10;
	const amenitiesArray = amenities.replace(/[\{\}]/g, '').split(',');
	let totalPrice;

	const openDialog = () => {
		setIsOpen(true);
	};

	const closeDialog = () => {
		setIsOpen(false);
	};

	const openDialogHost = () => {
		setIsOpenHost(true);
	};

	const closeDialogHost = () => {
		setIsOpenHost(false);
	};

	if (people === 1) {
		totalPrice = (numDaysStayed * parseFloat(price.toString().substring(1))).toString();
	} else {
		const basePrice = parseFloat(price.toString().substring(1));
		const additionalPrice = (people - 1) * 0.4 * basePrice;
		totalPrice = ((numDaysStayed * basePrice) + additionalPrice).toString();
	}

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

	function postHandler() {
		Swal.fire({
			title: 'Reservation successfull!',
			text: 'The host is notified about your booking.',
			icon: 'success',
			confirmButtonText: 'OK'
		}).then(() => {
			navigate('/');
		});
	}

	useEffect(() => {
		if (accommodates && arrivalDate && departureDate)
			setIsFormComplete(true);
		else
			setIsFormComplete(false);
	}, [accommodates, arrivalDate, departureDate]);

	useEffect(() => {
		Papa.parse("/src/assets/reviews.csv", {
			download: true,
			header: true,
			complete: (results) => {
				// Filter rows where card_id is equal to listing_id
				const filteredRows = results.data.filter((row) => cardProps.id === row.listing_id);
				// Set the filtered rows to the state
				setReviews(filteredRows);
			},
		});
	}, []);


	const [question, setQuestion] = useState('');
	const [questions, setQuestions] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (question.trim() !== '') {
			setQuestions([question, ...questions]);
			setQuestion('');
		}
	};


	return (

		<div className=" mx-auto lg:px-20 md:px-6 px-4 md:py-12 py-8 sm:mx-36">
			{/* header title-reviews-road */}
			<div>
				<ul className="block m-4 sm:grid grid-cols-4">
					<div>
						<p className="mb-4  text-3xl text-center leading-none tracking-tight text-gray-900 ">{name}</p>
					</div>

					<div className="text-base text-center sm:inline">
						<div className="inline text-yellow-500 inline">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						</div>
						<p className="inline px-2">{roundedRating}({numberOfReviews} Reviews)</p>
						<p></p>
					</div>

					<div className="inline text-base text-center">{street}</div>
				</ul>
			</div>

			{/* main image - description */}
			<div className=" grid gap-4">
				<div className="block sm:grid grid-cols-2">
					<button onClick={openDialog}>
						<img className="h-56 max-w-full rounded-lg hover:opacity-60 sm:h-96" src={thumbnail_url} alt="" />
					</button>
					<div className="flex flex-col justify-center">
						<p className="mb-4  text-3xl text-center leading-none tracking-tight text-gray-900 ">About this place</p>
						<p className="text-center">{description}</p>
					</div>
				</div>

				{/* rest of images*/}
				<div className="block sm:grid grid-cols-5 gap-4">
					<div>
						<button onClick={openDialog}><img className="h-auto max-w-full rounded-lg hover:opacity-60" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" /></button>
					</div>
					<div>
						<button onClick={openDialog}><img className="h-auto max-w-full rounded-lg hover:opacity-60" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" /></button>
					</div>
					<div>
						<button onClick={openDialog}><img className="h-auto max-w-full rounded-lg hover:opacity-60" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" /></button>
					</div>
					<div>
						<button onClick={openDialog}><img className="h-auto max-w-full rounded-lg hover:opacity-60" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" /></button>
					</div>
					<div>
						<button onClick={openDialog}><img className="mb-5 h-auto max-w-full rounded-lg hover:opacity-60" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" /></button>
						<div>
							<button onClick={openDialog} className="float-right flex flex-row  items-center  justify-end shadow-xl xl:mt-0 mt-20 bg-blue1 rounded-xl px-2 py-1 transition duration-300 transform hover:translate-y--2 text-white text-lg duration-300 transform hover:translate-y-2">See all photos</button>
							{isOpen && (
								<Dialog onClose={closeDialog}>
									<ul className="">
										<li>
											<img className="mb-10 rounded-lg" src={thumbnail_url} alt="" />
										</li>
										<li>
											<img className="my-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
										</li>
										<li>
											<img className="my-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
										</li>
										<li>
											<img className="my-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
										</li>
									</ul>
								</Dialog>
							)}
						</div>
					</div>

				</div>
			</div>

			{/* amenities - reserve */}
			<div className="grid grid-cols1 sm:p-10 sm:grid sm:grid-cols-2 sm:gap-x-10 ">

				<div>
					{/* amenities */}
					<div>
						<hr className="mb-10"></hr>
						<p className="text-center mb-10 text-2xl leading-none tracking-tight text-gray-900 sm:text-left">What this place offers</p>
						<ul className="grid grid-cols-2 gap-0">
							{amenitiesArray.map((amenity) => (
								<li className="text-center mb-2" key={amenity}><p>{amenity.replace(/"/g, '')}</p></li>
							))}
						</ul>
					</div>

					{/* host */}

					<div className='pt-5 pb-10 block sm:grid sm:grid-cols-2 sm:gap-4'>
						<ul>
							<button onClick={openDialogHost}>
								<li>
									<p className="text-center text-2xl leading-none tracking-tight text-gray-900 sm:text-left">
										This place is hosted by {hostName}
									</p>
								</li>
								<li>
									<div className="pt-10 float-left">
										<div className="max-w-lg mx-auto rounded-2xl shadow-lg hover:shadow-2xl transition duration-500">
											<div className="md:flex">
												<div className="md:flex-shrink-0">
													<img
														className="h-full w-full object-cover md:w-48"
														src={hostPictureUrl}
														alt="Host Picture"
													/>
												</div>
												<div className="p-10">
													<div className="text-center pb-4 tracking-wide text-xl text-indigo-500 font-semibold">
														{hostName}
													</div>
													<div className="mt-4">
														<p className="text-center">{hostAbout}</p>
														<p className="">Since: {hostSince}</p>
														<p className="">Listings: {hostListingCount}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</li>
							</button>
							{isOpenHost && (
								<Dialog onClose={closeDialogHost}> {/* Pass closeDialogHost as onClose prop */}
									<div className="block sm:grid sm:grid-cols-2 gap-2">
										<div className="md:flex-shrink-0">
											<img
												className="h-full w-full object-cover "
												src={hostPictureUrl}
												alt="Host Picture"
											/>
										</div>
										<div className="p-10">
											<div className="text-center pb-4 tracking-wide text-xl text-indigo-500 font-semibold">
												{hostName}
											</div>
											<div className="mt-4">
												<p className="text-center">{hostAbout}</p>
												<p className="">Since: {hostSince}</p>
												<p className="">Location: {hostLocation}</p>
												<p className="">Listings: {hostListingCount}</p>
												<p className="mt-5">Response Time: {hostResponseTime}</p>
												<p className="">Response Rate: {hostResponseRate}</p>
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
													placeholder={`Ask ${hostName} a question`}
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

					{/* map */}
					<div className="relative">
						<MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%' }} className="z-0">
							<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
							<Marker position={[latitude, longitude]} />
						</MapContainer>
					</div>
				</div>

				{/* reserve */}
				<div className="">
					<div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="block">
							<div className="md:flex-shrink-0">
								<img className=" w-full h-  " src={thumbnail_url} alt="Room" />
							</div>

							<div className="p-10">
								<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{roomType}</div>
								<div className="mt-4">
									<span className="text-gray-500">Price per night:</span>
									<span className="font-semibold text-xl text-gray-900 ml-1">{price}</span>
								</div>
								<p className="mt-4 text-gray-500">{accommodates} guests · {bedrooms} bedroom(s) · {beds} bed(s) · {bathrooms} bathroom(s)</p>

								<div className="flex items-center mt-4">
									<label className="text-indigo-500 mr-2" htmlFor="accommodates">Accommodates:</label>
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
											onChange={(e) => setPeople(Number(e.target.people))}
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
								<div className="">
									<div className="my-5">
										<label className="text-indigo-500" htmlFor="arrivalDate">Arrival Date:</label>
										<DatePicker
											id="arrivalDate"
											selected={arrivalDate}
											onChange={(date) => setArrivalDate(date)}
											dateFormat="dd-MM-yyyy"
											placeholderText="Select arrival date"

										/>
									</div>

									<div className="">
										<label className="text-indigo-500" htmlFor="departureDate">Departure Date:</label>
										<DatePicker
											id="departureDate"
											selected={departureDate}
											onChange={(date) => {
												if (date >= arrivalDate) {
													setDepartureDate(date);
												}
											}}
											dateFormat="dd-MM-yyyy"
											minDate={arrivalDate}
											disabled={!arrivalDate}
											placeholderText="Select departure date"

										/>
									</div>
								</div>

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
												onClick={postHandler}>Reserve</button>)
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
				</div>
			</div>


			<div className='block'>
				<div className="">
					<div><p className=" text-xl leading-none tracking-tight text-gray-900 ">Reviews about this place</p></div>
					<div className="sm:grid sm:grid-cols-2 sm:gap-4">
						{reviews.map(({ listing_id, id, date, reviewer_id, reviewer_name, comments }) => (
							<div key={id} className=" flex items-center justify-center">
								<div className="">
									<div className="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
										<link rel="icon" type="image/svg+xml" href="/src/assets/logosmall.png" />
										<div className="mt-4 flex items-center space-x-4 ">
											<div className="">
												<FaUser style={{ fontSize: '30px', color: '' }} />
											</div>
											<div className="text-sm font-semibold"> {reviewer_name} • <span className="font-normal"> {date}</span></div>
										</div>
										<div className="mt-4">
											<p className="mt-4 text-md text-gray-600">{comments}</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

		</div>
	);
}

export default CardDetails;
