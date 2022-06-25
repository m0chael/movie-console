import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Navs from "./components/Navs.jsx";
import Home from "./pages/Home";
import Starred from "./pages/Starred";
import Show from "./pages/Show";

export default function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/starred" element={ <Starred /> } />
          <Route path="/show/:id" element={ <Show /> } />
          <Route path="*" element={"not found"} />
      </Routes>
    </div>
  );
};