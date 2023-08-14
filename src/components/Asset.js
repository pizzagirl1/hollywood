import React from 'react';
import './Asset.css'
import noPhoto from '../images/noPhoto.png'
import PropTypes from 'prop-types';

const Asset = ( {id, name, imagePath, type, onClick, goalActors} ) => {

    const borderForGoalActor = () => {
        const goalIDs = goalActors.map((goal) => goal.id)
        const isGoalThisActor = goalIDs.includes(id)
        return isGoalThisActor ? "selection" : null
    }

    const image = imagePath !== null ? ` https://image.tmdb.org/t/p/w500/${imagePath}` : noPhoto;

    const handleClick = () => {
        if (name === null) {return}
        onClick( {id:id, name:name, imagePath:imagePath, type:type} );
    }

    const handleHover = () => {
        // console.log("hovering!")
    }

    return (
        <div onClick={handleClick} onMouseEnter={handleHover} className='asset'>
            <img className={`image ${borderForGoalActor()}`} src={image} alt={name}/>
            <div>
                {name}
            </div>
        </div>
    )
}

Asset.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    imagePath: PropTypes.string,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    goalActors: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            imagePath: PropTypes.string,
            type: PropTypes.string, 
        })
    )
}

export default Asset