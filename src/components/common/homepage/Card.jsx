import React from "react";
import { Link } from 'react-router-dom';

const Card = ({ title, image, price, dates }) => (
  <div className="square">
    {/* <img src={image} alt={title}  />
    <h2 className="square__title">{title}</h2>
    <p className="square__dates">{dates}</p>
    <h1 className="square__price">$ {price} night</h1> */}
    
    <div tabindex="0" className=" focus:outline-none mx-2 w-72 xl:mb-0 mb-8">
    <Link to={`/cards/${title}`}>
      <div>
        <img alt="image" src={image} tabindex="0" className="focus:outline-none w-full h-44 w-full object-cover shadow-lg rounded-lg" />
      </div>
      <div className="bg-white">
        <div class="flex items-center justify-between px-4 pt-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" tabindex="0" class="focus:outline-none" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2"></path>
            </svg>
          </div>
          <div class="bg-yellow-200 py-1.5 px-6 rounded-full">
            <p tabindex="0" class="focus:outline-none text-xs text-yellow-700">Rating</p>
          </div>
        </div>


        <div>
          <div className="flex items-center">
            <h2 tabindex="0" className="focus:outline-none text-xl font-semibold">{title}</h2>
          </div>
          <p tabindex="0" className="focus:outline-none text-sm text-gray-600 p-1">{dates}</p>

          <div className="pt-2" >
            <p tabindex="0">$ <span className="focus:outline-none text-lg font-semibold">  {price}</span> night</p>
          </div>
        </div>
      </div>
      </Link>
    </div>

  </div>


);

export default Card;

