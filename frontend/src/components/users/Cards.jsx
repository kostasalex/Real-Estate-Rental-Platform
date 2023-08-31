import React from 'react'
import Card from '/src/components/common/homepage/Card'

const Cards = ({listings}) => {
    return (
        <div className='flex flex-col justify-center'>
            <div className="flex flex-wrap">
            {listings.map((listing, index) => (
            <Card
                key={index}
                id={listing.id}
                thumbnailUrl={listing.thumbnail_url}
                mediumUrl={listing.medium_url}
                price={listing.price}
                roomType={listing.roomType}
                beds={listing.beds}
                numberOfReviews={listing.numberOfReviews}
                reviewScoresRating={listing.reviewScoresRating}
                street={listing.street}
                description={listing.description}
                name={listing.name}
                amenities={listing.amenities}
                accommodates={listing.accommodates}
                bathrooms={listing.bathrooms}
                bedrooms={listing.bedrooms}
                bed_type={listing.bed_type}
                longitude={listing.longitude}
                latitude={listing.latitude}
                hosts_id = {listing.hosts_id}/>
            ))}
            </div>
        </div>
      )    
}

export default Cards