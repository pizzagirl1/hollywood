import React from 'react';
import './Actor.css'
// import PropTypes from 'prop-types';

const Actor = ( {id, name, imagePath} ) => {
    return (
        <div>
            <img class="image" src={`https://image.tmdb.org/t/p/w500/${imagePath}`} alt={name}/>
            <p>{name}</p>
        </div>
    )
}

export default Actor