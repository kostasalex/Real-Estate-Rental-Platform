import React from "react";

function Card(props) {
	const handleClick = () => {
		localStorage.setItem("cardProps", JSON.stringify(props));
		const newTab = window.open(`/cards/${props.id}`, "_blank");
	};
	const maxRating = 100; // Maximum rating on the original scale
	const targetMaxRating = 5; // Maximum rating on the 5-point scale

	const convertedRating = (props.reviewScoresRating / maxRating) * targetMaxRating;

	const roundedRating = Math.round(convertedRating * 10) / 10;

	// Check if the listing is from the current logged-in host
	const isCurrentHostListing = props.hosts_id === props.currentHostsId;
	console.log("Host " +props.hosts_id)
	console.log("Cur " +props.currentHostsId)
	console.log(isCurrentHostListing)
	return (
		<div className="w-[450px] h-[500px] mb-4 cursor-pointer ">
			<section className="flex flex-col items-center bg-white">
				<div className="mt-10 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:gap-8">
					<article className="mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl">
						<a target="_blank" onClick={handleClick} >
							<div className="">
								<img src={props.thumbnailUrl} alt="" className="object-fill h-48 w-96" />
							</div>

							<div className="p-4">
								<div className="pb-6">
									<p className="overflow-hidden text-lg hover:text-blue-600 font-medium duration-500 ease-in-out">{props.street}</p>
								</div>

								<ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-6">
									<li className="mr-4 flex items-center text-left">
										<i className="mr-2 text-2xl text-blue-600">
											<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z" /></svg>
										</i>
										<span className="text-sm">{props.roomType}</span>
									</li>

									<li className="mr-4 flex items-center text-left">
										<i className="mr-2 text-2xl text-blue-600">
											<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-1.1-.9-2-2-2V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L4 19h1l.67-2h12.67l.66 2h1l.67-2H22v-5zm-4-2h-5V7h5v3zM6 7h5v3H6V7zm-2 5h16v3H4v-3z" /></svg
											></i>
										<span className="text-sm">{props.beds} Bed(s)</span>
									</li>

									{/* Render the "Edit" button only if it's the current host's listing */}
									{isCurrentHostListing && (
										<li className="flex items-center text-left">
											<button
												className="ml-2 text-blue-600 text-sm"
												onClick={() => handleEditListing(props.id)}
											>
												Edit
											</button>
										</li>
									)}
								</ul>
								<ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
									<li className="text-left">
										<span className="text-sm text-gray-400">Price</span>
										<p className="m-0 text-base font-medium">{props.price}</p>
									</li>

									<li className="text-left">
										<span className="text-sm text-gray-400">Rating</span>
										<ul className="m-0 flex items-center p-0 font-medium">
											<li className="inline text-yellow-500">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											</li>
											<li className="ml-2 inline text-base"><p>{roundedRating}({props.numberOfReviews} Reviews)</p></li>
										</ul>
									</li>
								</ul>
							</div>
						</a>
					</article>
				</div>
			</section>
		</div>
	);

}

export default Card;
