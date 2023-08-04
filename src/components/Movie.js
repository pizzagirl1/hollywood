import React from "react";
import noPhoto from '../images/noPhoto.png'
import './Actor.css'

const Movie = ({id, name, imagePath, onClick, cast}) => {

    const image = imagePath !== null ? ` https://image.tmdb.org/t/p/w500/${imagePath}` : noPhoto;

    const handleClick = () => {
        console.log("Clicked!")
        onClick( {id:id, name:name, imagePath:imagePath, type:"Movie"} )
    }

    return (
        <div onClick={handleClick}>
            <img className="image" src={image} alt={name}/>
            <div>
                {name}
            </div>
        </div>
    )
}

export default Movie;