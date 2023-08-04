import React from "react";
import noPhoto from '../images/noPhoto.png'
import './Actor.css'

const Movie = ({id, name, imagePath, onClick, cast}) => {

    const image = imagePath !== null ? ` https://image.tmdb.org/t/p/w500/${imagePath}` : noPhoto;

    const handleClick = () => {
        // onClick()
        console.log("Clicked!")
    }

    return (
        <div onClick={handleClick}>
            <img className="image" src={image} alt={name}/>
            <p>{name}</p>
        </div>
    )
}

export default Movie;