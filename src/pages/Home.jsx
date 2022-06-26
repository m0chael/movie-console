import React, { useState, useEffect, useContext} from 'react';
import MainPageLayout from "../components/MainPageLayout";
import {api_get, API_BASE_MOVIES_URL, API_BASE_PEOPLE_URL} from "../misc/config";
import ShowGrid from "../components/show/ShowGrid";
import ActorGrid from "../components/actor/ActorGrid";
import Title from "../components/Title.jsx";
import {GlobalSearchState} from '../misc/config';

const Home = (props) => {
    const global_search_state = React.useContext(GlobalSearchState);

    const [input, setInput] = useState("");
    const [movie_results, setMovieResults] = useState(null);
    const [search_option, setSearchOption] = useState("shows");
    const is_shows_searching = (search_option == "shows");
    

    useEffect( () => {
        if (global_search_state.type) {
            console.log("Search state found");
            setMovieResults(global_search_state.result);
            setInput(global_search_state.input);
        }
        return () => {
            console.log("Exit");
        }
    }, []); //[] is dependencies which will run on that item being changed

    const on_input_change = (evt) => {
        setInput(evt.target.value);
    };
    
    const on_key_down = (evt) => {
        if (evt.keyCode == 13) {
            on_search();
        }
    };

    const on_search = () => {
        let base_url_for_searching = is_shows_searching ? API_BASE_MOVIES_URL : API_BASE_PEOPLE_URL;
        let url = `${base_url_for_searching}${input}`;
        api_get(url).then((result)=>{
            setMovieResults(result);
            props.set_last_search_term(result, input, is_shows_searching);
        });
    };
    
    const render_results = () => {
        if (movie_results && movie_results.length == 0) {
            return <div className="no-results">No results</div>
        } else if (movie_results && movie_results.length > 0) {
            return movie_results[0].show ? <ShowGrid data={movie_results}></ShowGrid> : <ActorGrid data={movie_results}></ActorGrid>
        } else {
            return  <div className="no-results">Please search for a movie or actor...</div>
        }
    };
    
    const on_radio_change = (evt) => {
        setSearchOption(evt.target.value);
    };

    return (
        <MainPageLayout>
            <div className="main-console">
                <Title title="Movie console" subtitle="Search for a movie or actor!"></Title>
                <input className="main-search" type="text" placeholder="Search..." onKeyDown={on_key_down} onChange={on_input_change} value={input}></input>
                <div className="radios">
                        <label htmlFor="shows-search">
                            Shows
                            <input id="shows-search" checked={is_shows_searching} type="radio" value="shows" onChange={on_radio_change}></input>
                        </label>
                        <label htmlFor="actors-search">
                            Actors
                            <input id="actors-search" checked={!is_shows_searching} type="radio" value="people" onChange={on_radio_change}></input>
                        </label>
                </div>
                <button type="button" onClick={on_search}>Search now</button>
           </div>
           { render_results() }
        </MainPageLayout>
    )
};

export default Home;