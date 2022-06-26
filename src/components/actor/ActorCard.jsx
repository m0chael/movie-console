import React from 'react';
import { Link } from 'react-router-dom';

export default function ActorCard(props) {
    let person = props.data.person;
    
    return (
        <Link className="show-links" to={`/actor/${person.id}`}>
            <div className="actor-card" key={person.id}>
                { person.image ? <div><img src={person.image.medium} /></div> : <div className="image-not-found">No image found</div> }
                <h1>{person.name}</h1>
                <p>{person.birthday}</p>
                <p>{person.deathday}</p>
            </div>
        </Link>
    );
};