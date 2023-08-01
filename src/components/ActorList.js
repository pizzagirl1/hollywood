import React from 'react';
import Actor from './Actor';

const ActorList = ( {actors} ) => {
    const getActorListJSX = (actors) => {
        return actors.map( (actor) => (
            <Actor
                id={actor.id}
                key={actor.id}
                name= {actor.name}
                image={actor.imagePath}
            />
        ))
    }

    return (
        <div>
            <ul>{getActorListJSX(actors)}</ul>
        </div>
    )
}

export default ActorList;