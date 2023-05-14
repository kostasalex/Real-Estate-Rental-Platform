import React from 'react';
import { useState, useEffect } from 'react';
import Dialog from './Dialog';
function CardDetails() {

	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [thumbnail_url, setThumbnailUrl] = useState('');
	const [medium_url, setMediumUrl] = useState('');
	const [price, setPrice] = useState('');
	const [roomType, setRoomType] = useState('');
	const [beds, setBeds] = useState('');
	const [accommodates, setAccommodates] = useState('');
	const [bathrooms, setBathrooms] = useState('');
	const [bedrooms, setBedrooms] = useState('');
	const [bedType, setBedType] = useState('');
	const [numberOfReviews, setNumberOfReviews] = useState('');
	const [reviewScoresRating, setReviewScoresRating] = useState('');
	const [street, setStreet] = useState('');
	const [description, setDescription] = useState('');
	const [hostName, setHostName] = useState('');
	const [hostPictureUrl, setPictureUrl] = useState('');
	const [amenities, setAmenities] = useState('');


	const [isOpen, setIsOpen] = useState(false);

	const openDialog = () => {
		setIsOpen(true);
	};

	const closeDialog = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const cardProps = JSON.parse(localStorage.getItem("cardProps"));
		if (cardProps) {
			setId(cardProps.id);
			setName(cardProps.name);
			setThumbnailUrl(cardProps.thumbnail_url);
			setMediumUrl(cardProps.medium_url);
			setPrice(cardProps.price);
			setRoomType(cardProps.room_type);
			setBeds(cardProps.beds);
			setAccommodates(cardProps.accommodates);
			setBathrooms(cardProps.bathrooms);
			setBedrooms(cardProps.bedrooms);
			setBedType(cardProps.bed_type);
			setNumberOfReviews(cardProps.number_of_reviews);
			setReviewScoresRating(cardProps.review_scores_rating);
			setStreet(cardProps.street);
			setDescription(cardProps.description);
			setHostName(cardProps.host_name);
			setPictureUrl(cardProps.host_picture_url)
			setAmenities(cardProps.amenities);
		}
	}, []);

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
						{numberOfReviews}({reviewScoresRating})
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

			{/* host */}
			<div>
				<ul className="block p-auto py-auto pb-auto sm:grid grid-cols-4">
					<li><p className="inline text-xl  leading-none tracking-tight text-gray-900 ">Room in a rental unit hosted by {hostName}</p></li>
					<li className="inline ml-auto"><button><img className=" rounded-full object-full h-12 w-12 border-solid border border-blue-600" src={hostPictureUrl} /></button></li>
				</ul>
			</div>

			{/* amenities - reserve */}
			<div className="block sm:p-10 sm:grid grid-cols-2 gap-x-36">
				<ul className="p-10 sm:p-auto grid grid-cols-4 gap-4 ">
					{/* {amenitiesArray.map((amenity) => (
						<li key={amenity.trim()}><p className="p-5 text-center inline-flex items-center relative border rounded-lg ">{amenity.trim()}</p></li>
					))} */}
					<li><p className="p-5 text-center inline-flex items-center relative border rounded-lg ">{bedType}</p></li>
				</ul>

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


		</div>
	);
}

export default CardDetails;
