import React from 'react';
// import PropTypes from 'prop-types';

const Actor = ( {id, name, imagePath} ) => {
    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w500/${imagePath}`} alt={name}/>
            {name}
        </div>
    )
}

export default Actor