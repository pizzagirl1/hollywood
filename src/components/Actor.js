import React from 'react';
import './Actor.css'
// import PropTypes from 'prop-types';

const Actor = ( {id, name, imagePath, onClick, goalActors} ) => {

    const borderForGoalActor = () => {
        const goalIDs = goalActors.map((goal) => goal.id)
        const isGoalThisActor = goalIDs.includes(id)
        return isGoalThisActor ? "image selection" : "image"
    }

    const handleClick = () => {
        onClick( {id, name, imagePath, type:'Actor'})
    }

    return (
        <div onClick={handleClick}>
            <img className={borderForGoalActor} src={`https://image.tmdb.org/t/p/w500/${imagePath}`} alt={name}/>
            <div>
                {name}
            </div>
        </div>
    )
}

export default Actor