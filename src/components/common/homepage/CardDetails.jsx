import React from 'react';
import { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function CardDetails() {
	const cardProps = JSON.parse(localStorage.getItem("cardProps"));

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

	const [amenities, setAmenities] = useState(cardProps.amenities);

	const [longitude, setLongitude] = useState(cardProps.longitude);
	const [latitude, setLatitude] = useState(cardProps.latitude);

	const maxRating = 100; // Maximum rating on the original scale
	const targetMaxRating = 5; // Maximum rating on the 5-point scale

	const convertedRating = (reviewScoresRating / maxRating) * targetMaxRating;

	const roundedRating = Math.round(convertedRating * 10) / 10;
	const [isOpen, setIsOpen] = useState(false);

	const openDialog = () => {
		setIsOpen(true);
	};

	const closeDialog = () => {
		setIsOpen(false);
	};


	const amenitiesArray = amenities.replace(/[\{\}]/g, '').split(',');
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
						<img className="h-56 max-w-full rounded-lg hover:opacity-60 sm:h-96" src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" alt="" />
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
											<img className="mb-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
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
			<div className="block sm:p-10 sm:grid grid-cols-2 gap-x-36">

				<div>
					<hr className="mb-10"></hr>
					<p className="text-center mb-10 text-2xl leading-none tracking-tight text-gray-900 sm:text-left">What this place offers</p>
					<ul className="grid grid-cols-2 gap-0">
						{amenitiesArray.map((amenity) => (
							<li className="text-center mb-2" key={amenity}><p>{amenity.replace(/"/g, '')}</p></li>
						))}

					</ul>
				</div>
				{/* reserve */}
				<div className="p-10 sm:p-auto" >
					<div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="md:flex">
							<div className="md:flex-shrink-0">
								<img className="h-full w-full object-cover md:w-48" src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" alt="Room" />
							</div>

							<div className="p-10">

								<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{roomType}</div>
								<div className="mt-4">
									<span className="text-gray-500">Price per night:</span>
									<span className="font-semibold text-xl text-gray-900 ml-1">{price}</span>
								</div>
								<p className="mt-4 text-gray-500">{accommodates} guests · {bedrooms} bedroom(s) · {beds} bed(s) · {bathrooms} bathroom(s)</p>
								<div className="mt-4">
									<span className="text-gray-500">Total price:</span>
									<span className="font-semibold text-gray-900 text-xl ml-1">$510</span>
								</div>
								<div className="mt-6">
									<button className="flex flex-row  items-center  justify-end shadow-xl xl:mt-0 mt-20 bg-blue1 rounded-xl px-2 py-1 transition duration-300 transform hover:translate-y--2 text-white text-lg duration-300 transform hover:translate-y-2">Reserve</button>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

			{/* host */}
			<div>
				<ul className="block p-10">
					<li><p className=" text-xl leading-none tracking-tight text-gray-900 ">This place is hosted by {hostName}</p></li>
					<li>
						<div className="pt-10 float-left" >
							<div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
								<div className="md:flex">
									<div className="md:flex-shrink-0">
										<img className="h-full w-full object-cover md:w-48" src={hostPictureUrl} alt="Host Picture" />
									</div>

									<div className="p-10">

										<div className=" text-center pb-4 tracking-wide text-xl text-indigo-500 font-semibold">{hostName}</div>
										<div className="mt-4">
											<p className="text-center">{hostAbout}</p>
											<p className="">Since: {hostSince}</p>
											<p className="">Location: {hostLocation}</p>
											<p className="">Response Time: {hostResponseTime}</p>
											<p className="">Response Rate: {hostResponseRate}</p>
										</div>
						
									</div>
								</div>
							</div>

						</div>
					</li>
				</ul>
				
			</div>
			
			<MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={[latitude, longitude]} />
			</MapContainer>



		</div>
	);
}

export default CardDetails;
