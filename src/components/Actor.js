import React from 'react';
import './Actor.css'
// import PropTypes from 'prop-types';

const Actor = ( {id, name, imagePath, onClick, goalActors} ) => {

    const borderForGoalActor = () => {
        console.log("inside border function", goalActors)
        // const goalIDs = goalActors.map((goal) => goal.id)
        // const isGoalThisActor = goalIDs.includes(id)
        const isGoalThisActor = goalActors.some(actor => actor.id === id);
        console.log(isGoalThisActor);
        return isGoalThisActor ? "selection" : null
    }

    const handleClick = () => {
        onClick( {id, name, imagePath, type:'Actor'});
    }

    return (
        <div onClick={handleClick}>
            <img className={`image ${borderForGoalActor()}`} src={`https://image.tmdb.org/t/p/w500/${imagePath}`} alt={name}/>
            <div>
                {name}
            </div>
        </div>
    )
}

export default Actor