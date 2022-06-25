import React from 'react';
import {Link} from 'react-router-dom';

const LINKS = [
    {to: "/", text: "Home"},
    {to: "/starred", text: "Go to Starred"}
];

const Navs = () => {

    return (
        <div className="hide">
            <ul>
                {
                    LINKS.map(item => (
                        <li key={item.to}>
                            <Link to={item.to}>{item.text}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};

export default Navs;