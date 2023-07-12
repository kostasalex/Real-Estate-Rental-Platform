import React from 'react'
import Card from '/src/components/common/homepage/Card'

const Cards = ({listings}) => {
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

export default Cards