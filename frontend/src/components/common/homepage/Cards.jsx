import React, { useEffect, useState } from "react";
import Card from "./Card";

const Cards = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/cards")
      .then((response) => response.json())
      .then((data) => setListings(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-col justify-center">
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
            bed_type={listing.bed_type}
            lng={listing.lng}
            lat={listing.lat}
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
  );
};

export default Cards;
