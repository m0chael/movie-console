import React from 'react';

export const API_BASE_MOVIES_URL = "https://api.tvmaze.com/search/shows?q=";
export const API_BASE_PEOPLE_URL = "https://api.tvmaze.com/search/people?q=";
export const API_BASE_SHOW_QUERY_URL =  "https://api.tvmaze.com/shows/";

export const GlobalSearchState = React.createContext(null);

export async function api_get(query_string) {
    const response = await fetch(query_string).then(response => {
        return response.json()
    }).catch((err) => {
        throw new Error(`Oops! An error occurred when requesting: ${query_string}`);
    });
    return response;
};