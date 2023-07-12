import React, { useEffect, useState } from "react";
import Card from "./Card";

const Cards = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/cards")
      .then((response) => response.json())
      .then((data) => setListings(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-wrap">
        {listings.map((listing, index) => (
          <Card key={index} id={listing.cardUid} {...listing} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
