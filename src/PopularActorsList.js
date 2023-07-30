import React from "react";

const PopularActorsList = ({ popularActors, fetchNameByPersonId}) => {
    const getActorListJSX = (actorIds) => {
        const actorNames = actorIds.map((id) => fetchNameByPersonId(id))
        return actorNames.map( (id) => (
            <div>
                {id}
            </div>
            )
        )
    }

    return (
        <div>
            <ul>{getActorListJSX(popularActors)}</ul>
        </div>
    )
}


export default PopularActorsList