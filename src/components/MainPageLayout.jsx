import React from 'react';
import Navs from "./Navs.jsx";

export default function MainPageLayout(props) {
  return (
    <div className="main-page">
      <Navs />
      {props.children}
    </div>
  );
};