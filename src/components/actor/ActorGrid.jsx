import React from 'react';
import ActorCard from "./ActorCard";

export default function ActorGrid(props) {
  return (
    <div className="actor-grid">
      {
        props.data.map((item) => {
          return <ActorCard key={item.person.id} data={item} />
        })
      }
    </div>
  );
};