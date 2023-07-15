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
                thumbnailUrl={listing.thumbnailUrl}
                mediumUrl={listing.mediumUrl}
                price={listing.price}
                roomType={listing.roomType}
                beds={listing.beds}
                numberOfReviews={listing.numberOfReviews}
                reviewScoresRating={listing.reviewScoresRating}
                street={listing.street}
                description={listing.description}
                name={listing.name}
                hostName={listing.hostName}
                hostPictureUrl={listing.hostPictureUrl}
                amenities={listing.amenities}
                accommodates={listing.accommodates}
                bathrooms={listing.bathrooms}
                bedrooms={listing.bedrooms}
                bedType={listing.bedType}
                longitude={listing.longitude}
                latitude={listing.latitude}
                hostSince={listing.hostSince}
                hostLocation={listing.hostLocation}
                hostAbout={listing.hostAbout}
                hostResponseTime={listing.hostResponseTime}
                hostResponseRate={listing.hostResponseRate}
                hostListingsCount={listing.hostListingsCount}
            />
            ))}
            </div>
        </div>
      )    
}

export default Cards