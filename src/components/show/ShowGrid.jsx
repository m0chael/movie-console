import React from 'react';
import ShowCard from "./ShowCard";

export default function ShowGrid(props) {
  return (
    <div className="show-grid">
      {
        props.data.map((item) => {
          return <ShowCard key={item.show.id} data={item} />
        })
      }
    </div>
  );
};