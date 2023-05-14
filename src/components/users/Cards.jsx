import React from 'react'
import Card from '/src/components/common/homepage/Card'

const Cards = ({listings}) => {
    return (
        <div className='flex flex-col justify-center'>
            <div className="flex flex-wrap">
            {listings && listings.map(
            ({
                thumbnail_url,
                medium_url,
                price,
                room_type,
                beds,
                number_of_reviews,
                review_scores_rating,
                street,
                description,
            }) => (
                <Card
                key={thumbnail_url}
                thumbnail_url={thumbnail_url}
                medium_url={medium_url}
                price={price}
                room_type={room_type}
                beds={beds}
                number_of_reviews={number_of_reviews}
                review_scores_rating={review_scores_rating}
                street={street}
                description={description}
                />
            )
            )}
            </div>
        </div>
      )    
}

export default Cards