import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '/src/components/common/homepage/Card'
import BlueSpinner from '../loader/BlueSpinner';


const Recommendation = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('loggedInUserId') // Assume some way to get this (maybe a prop, context, etc.)
    const isGuest = !userId
    const visited =  localStorage.getItem('visitedListings')


    useEffect(() => {
      let visitedListings = [];
      
      if (isGuest) {
          const storedListings = localStorage.getItem('visitedListings');
          if (storedListings) {
              visitedListings = JSON.parse(storedListings);
              getRecommendationsGuest(visitedListings); // For guests
          }
      } else {
          axios.get(`https://localhost:8443/visitedListings/${userId}`)
          .then(response => {
              visitedListings = response.data.split(",");
              getRecommendationsUser(userId); // For logged-in users
          })
          .catch(error => {
              console.error("Error fetching visited listings:", error);
          });
      }
    }, [isGuest, userId]);
    
    const getRecommendationsGuest = (visitedListings) => {

        axios.post('https://localhost:8443/getRecommendationsForGuest', { ids: visitedListings })
        .then(res => {
            setListings(res.data); // assuming the response has the listings data.
            setLoading(false); // Data has been fetched
            console.log("From guest rec: ", res.data);
        })
        .catch(error => {
            console.error("Error fetching listing details:", error);
            setLoading(false); // Data has been fetched
        });

    }

    const getRecommendationsUser = (userId) => {

      axios.post(`https://localhost:8443/getRecommendationsForUser?userId=${userId}`)
      .then(res => {
          setListings(res.data); // assuming the response has the listings data.
          setLoading(false); // Data has been fetched
          console.log("From user rec: ", res.data);
      })
      .catch(error => {
          console.error("Error fetching listing details:", error);
          setLoading(false); // Data has been fetched
      });
      

  }
  

  return (
    <div  >
      {listings && (
      <div>
      <div className='flex justify-center text-gray-600  text-3xl font-bold '>Recommeded Listings Just For You</div>
      {loading && <div className='flex justify-center items-center h-screen'><BlueSpinner/></div>}
      {!loading && listings && <div className="flex opacity-80 flex-wrap">
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
      </div>}
      <div className='flex justify-center text-3xl font-bold '>End Of Recommendation</div>
      </div>)}
      {!loading && !listings && <div className='text-red-500 justify-center flex text-xl'>Recommendations to display</div>}
    </div>

  );
}

export default Recommendation;