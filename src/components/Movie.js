import React from "react";
import noPhoto from '../images/noPhoto.png'
import './Actor.css'

const Movie = ({id, title, imagePath, cast}) => {

    const image = imagePath !== null ? ` https://image.tmdb.org/t/p/w500/${imagePath}` : noPhoto;

    return (
        <div>
            <img className="image" src={image} alt={title}/>
            <p>{title}</p>
        </div>
    )
}

export default Movie;