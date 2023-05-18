import React from "react";
import Card from "./Card";
import Papa from "papaparse";

// const Cards = () => (
// 	<div className="flex flex-wrap">
// 		{data.map(({ thumbnail_url, medium_url, price, room_type, beds, number_of_reviews, review_scores_rating, street, description, name, host_name, host_picture_url, amenities, accommodates, bathrooms, bedrooms, bed_type }, id) => (
// 			<Card key={id} id={id} thumbnail_url={thumbnail_url} medium_url={medium_url} price={price} room_type={room_type} beds={beds} number_of_reviews={number_of_reviews} review_scores_rating={review_scores_rating} street={street} description={description} name={name} host_name={host_name} host_picture_url={host_picture_url} amenities={amenities} accommodates={accommodates} bathrooms={bathrooms} bedrooms={bedrooms} bed_type={bed_type} />
// 		))}
// 	</div>
// );

const Cards = () => {
	const NUM_RESULTS = 30;
	const [listings, setListings] = React.useState([]);

	React.useEffect(() => {
		Papa.parse("/src/assets/listings.csv", {
			download: true,
			header: true,
			complete: (results) => {
				// Randomly select 10 rows from the CSV file
				const randomRows = [];
				for (let i = 0; i < NUM_RESULTS; i++) {
					const randomIndex = Math.floor(Math.random() * results.data.length);
					randomRows.push(results.data[randomIndex]);
					results.data.splice(randomIndex, 1);
				}
				setListings(randomRows);
			},
		});
	}, []);

	return (
		<div className='flex flex-col justify-center'>
			<div className="flex flex-wrap">
				{listings && listings.map(
					({id, thumbnail_url, medium_url, price, room_type, beds, number_of_reviews, review_scores_rating, street, description, name, host_name, host_picture_url, amenities, accommodates, bathrooms, bedrooms, bed_type,longitude,latitude,host_since,host_location,host_about,host_response_time,host_response_rate }) => (
						<Card  key={id} id={id} thumbnail_url={thumbnail_url} medium_url={medium_url} price={price} room_type={room_type} beds={beds} number_of_reviews={number_of_reviews} review_scores_rating={review_scores_rating} street={street} description={description} name={name} host_name={host_name} host_picture_url={host_picture_url} amenities={amenities} accommodates={accommodates} bathrooms={bathrooms} bedrooms={bedrooms} bed_type={bed_type} longitude={longitude} latitude={latitude} host_since={host_since} host_location={host_location} host_about={host_about} host_response_time={host_response_time} host_response_rate={host_response_rate}/>
					)
				)}
			</div>
		</div>
	)
}

export default Cards;

