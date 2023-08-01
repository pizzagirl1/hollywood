import React from 'react';
import './Actor.css'
// import PropTypes from 'prop-types';

const Actor = ( {id, name, imagePath, onClickImageAppendObjectToChain} ) => {

    const onClick = () => {
        onClickImageAppendObjectToChain( {id, name, imagePath, type:'Actor'})
    }

    return (
        <div onClick={onClick}>
            <img className="image" src={`https://image.tmdb.org/t/p/w500/${imagePath}`} alt={name}/>
            <div>
                {name}
            </div>
        </div>
    )
}

export default Actor