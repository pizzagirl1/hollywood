import React from "react";
import './Actor.css'

const Movie = ({id, title, imagePath, cast}) => {
    return (
        <div>
            <img className="image" src={`https://image.tmdb.org/t/p/w500/${imagePath}`} alt={title}/>
            <p>{title}</p>
        </div>
    )
}

export default Movie;