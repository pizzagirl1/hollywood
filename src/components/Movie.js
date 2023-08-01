import React from "react";
import './Actor.css'

const Movie = ({id, name, imagePath, cast}) => {
    return (
        <div>
            <img className="image" src={`https://image.tmdb.org/t/p/w500/${imagePath}`} alt={name}/>
            <p>{name}</p>
        </div>
    )
}

export default Movie;