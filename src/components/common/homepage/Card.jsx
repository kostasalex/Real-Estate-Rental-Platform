import React from "react";

const Card = ({ title, image, price, dates }) => (
  <div className="square">
    <img src={image} alt={title} className="square__image" />
    <h2 className="square__title">{title}</h2>
    <p className="square__dates">{dates}</p>
    <h1 className="square__price">$ {price} night</h1>
    
  </div>
);

export default Card;

