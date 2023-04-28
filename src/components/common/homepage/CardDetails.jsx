import React from 'react';
import { useParams } from 'react-router';

function CardDetails({}) {

  const {cardTitle} = useParams();

 

  return (
    <div className="card-details">
      <h1>Card Details</h1>
      <p>Title: {cardTitle}</p>
    </div>
  );
}

export default CardDetails;
