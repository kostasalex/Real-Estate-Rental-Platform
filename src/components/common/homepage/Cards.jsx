import React from "react";
import Card from "./Card";

const data = [
  { title: "Paris", image: "https://picsum.photos/id/237/200/200", price: "100", dates: "Apr 10-23" },
  { title: "Tokyo", image: "https://picsum.photos/id/238/200/200", price: "329", dates: "Apr 10-23" },
  { title: "New York", image: "https://picsum.photos/id/239/200/200", price: "517", dates: "Apr 10-23" },
  { title: "Sydney", image: "https://picsum.photos/id/240/200/200", price: "1,289", dates: "Apr 10-23" },
  { title: "London", image: "https://picsum.photos/id/241/200/200", price: "399", dates: "Apr 10-23" },
  { title: "Los Angeles", image: "https://picsum.photos/id/242/200/200", price: "263", dates: "Apr 10-23" },
];

const Cards = () => (
  <div className="flex flex-wrap">
    {data.map(({ title, image, price, dates }, index) => (
      <Card key={index} title={title} image={image} price={price} dates={dates} />
    ))}
  </div>
);

export default Cards;

