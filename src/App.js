import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navs from "./components/Navs.jsx";
import Home from "./pages/Home";
import Starred from "./pages/Starred";
import Show from "./pages/Show";
import Actor from "./pages/Actor";

import {GlobalSearchState} from './misc/config';

const initial_global_search_state = {
  result: null,
  type: null
};

export default function App() {
  const [global_search_state, setLastSearchTermState] = useState(initial_global_search_state);
  
  const set_last_search_term = (res, input_incoming, is_shows_searching) => {
    setLastSearchTermState({
      result: res,
      type: is_shows_searching ? "shows" : "actors",
      input: input_incoming
    });
  };

  return (
    <div>
      <GlobalSearchState.Provider value={global_search_state}>
        <Routes>
            <Route path="/" element={ <Home set_last_search_term={set_last_search_term} /> } />
            <Route path="/starred" element={ <Starred /> } />
            <Route path="/show/:id" element={ <Show /> } />
            <Route path="/actor/:id" element={ <Actor /> } />
            <Route path="*" element={"not found"} />
        </Routes>
      </GlobalSearchState.Provider>
    </div>
  );
};