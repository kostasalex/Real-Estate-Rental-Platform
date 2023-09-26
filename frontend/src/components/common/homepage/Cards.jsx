import React, { useEffect, useState } from "react";
import Card from "./Card";
const Cards = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("https://localhost:8443/cards")
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
            hosts_id = {listing.hosts_id}
            accessing_info = {listing.accessing_info}
            rentalRules = {listing.rentalRules}
            size = {listing.size}
            minimum_nights = {listing.minimum_nights}
            price_per_additional_guest = {listing.price_per_additional_guest}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
