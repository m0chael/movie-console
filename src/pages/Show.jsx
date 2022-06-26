import React, { useEffect, useReducer } from 'react';
import { useParams, Link} from "react-router-dom";
import { api_get, API_BASE_SHOW_QUERY_URL} from '../misc/config';

const reducer = (previous_state, action) => {
    switch(action.type) {
        case "FETCH_SUCCESS": {
            return {...previous_state, is_loading:false, error: null, show: action.show}
        };
        
        case "FETCH_FAILED": {
            return {...previous_state, is_loading:false, error: action.error, show:null }
        };

        default: return previous_state;
    };
};

const initial_state = {
    show: null,
    is_loading: true,
    error: null
};

const Show = (props) => {
    const params = useParams();
    const reducer_state = useReducer(reducer, initial_state);
    const state = reducer_state[0];
    const dispatch = reducer_state[1];

    useEffect( () => {
        let is_mounted = true;

        get_this_show_item(is_mounted);
        
        return () => {
            console.log("exit use effect");
            is_mounted = false;
        }
    }, []);

    const get_this_show_item = (is_mounted) => {
        let base_url_for_searching = API_BASE_SHOW_QUERY_URL;
        let url = `${base_url_for_searching}${params.id}`;
        api_get(url).then((result)=>{
            if (is_mounted) {
                console.log(result);
                dispatch({ type: "FETCH_SUCCESS", show: result });
            }
        }).catch(err => {
            console.log(err);
            if (is_mounted) {
                dispatch({type: "FETCH_FAILED", error: err });
            }
        });
    };

    if (state.is_loading) {
        return <div className="loading">Loading...</div>;
    } else if (state.error) {
        return <div><Link className="go-home-links" to={"/"}>&#x2190;</Link><div className="error-box">{state.error.message}</div></div>
    } else {
        return (
            <div className="show-results">
                <Link className="go-home-links" to={"/"}>&#x2190;</Link>
                {
                    state.show ?
                        <div>
                            <div className="image-description-container">
                                { state.show.image ? <img src={state.show.image.medium} /> : <div className="image-not-found">No image found</div>  }
                                <div className="show-right-container">
                                    <div className="show-title">
                                        <h1>{state.show.name}</h1>
                                        <div className="rating"><span>&#x2605;</span> {state.show.rating.average}</div>
                                    </div>
                                    <p>{state.show.summary}</p>
                                    <ul className="tags">
                                        <li key={state.show.id + "_" + state.show.language}>{state.show.language}</li>
                                        {
                                            state.show.genres.map((item) => {
                                                return <li key={item}>{item}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>

                        </div>
                    :
                        ""
                }
            </div>
        )
    }
};

export default Show;