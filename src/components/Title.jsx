import React from 'react';

export default function Title(props) {
  return (
    <div>
      <h1 className="main-title">{props.title}</h1>
      <p className="main-subtitle">{props.subtitle}</p>
    </div>
  );
};