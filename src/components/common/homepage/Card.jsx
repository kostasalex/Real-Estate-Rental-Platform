import React from "react";

const Card = ({ title, image }) => (
  <div className="square">
    <img src={image} alt={title} className="square__image" />
    <h3 className="square__title">{title}</h3>
  </div>
);

export default Card;

