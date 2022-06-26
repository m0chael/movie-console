import React from 'react';
import { Link } from 'react-router-dom';

export default function ShowCard(props) {
    let show = props.data.show;

    return (
        <Link className="show-links" to={`/show/${show.id}`}>
            <div className="show-card" key={show.id}>
                {show.image ? <img src={show.image.medium} /> : <div className="image-not-found">No image found</div>}
                <h1>{show.name}</h1>
                <p>{show.type}</p>
                <p>Released: {show.premiered}</p>
            </div>
        </Link>
    );
};