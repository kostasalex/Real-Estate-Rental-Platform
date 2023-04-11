import React from "react";
import Card from "./Card";

const data = [
  { title: "Paris", image: "https://picsum.photos/id/237/200/200" },
  { title: "Tokyo", image: "https://picsum.photos/id/238/200/200" },
  { title: "New York", image: "https://picsum.photos/id/239/200/200" },
  { title: "Sydney", image: "https://picsum.photos/id/240/200/200" },
  { title: "London", image: "https://picsum.photos/id/241/200/200" },
  { title: "Los Angeles", image: "https://picsum.photos/id/242/200/200" },
];

const Cards = () => (
  <div className="flex flex-wrap">
    {data.map(({ title, image }, index) => (
      <Card key={index} title={title} image={image} />
    ))}
  </div>
);

export default Cards;

