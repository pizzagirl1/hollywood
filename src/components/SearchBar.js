import React, { useState } from 'react';
import AssetList from './AssetList';
import PropTypes from "prop-types"

const SearchBar = ( {
    searchActor, searchMovie, 
    resultFromSearch, setResultFromSearch, 
    searchData, setSearchData,
    defaultEmptyActorObject,
    fetchMovieCreditsForActor,
    fetchCastDataForMovie,
    onClickAssetList } ) => {
    
    const defaultSearchQuery = { query: '' };
    const [formField, setFormField] = useState(defaultSearchQuery);

    const onQueryChange = (event) => {
        setFormField({ query: event.target.value });
    }

    const onClickSearchActor = (event) => {
        event.preventDefault();
        if (formField.query.length === 0){
            window.alert('Search may not be blank');
            setFormField(defaultSearchQuery);
            setResultFromSearch(defaultEmptyActorObject);
            return;
        }
        searchActor(formField.query)
        .then((response) => {
            setResultFromSearch(response)
            return response.id;
        })
        .then( (actorId) => {return fetchMovieCreditsForActor(actorId)})
        .then( (responseData) => setSearchData(responseData))
        setFormField(defaultSearchQuery);
    }

    const onClickSearchMovie = (event) => {
        event.preventDefault();
        if (formField.query.length === 0){
            window.alert('Search may not be blank');
            setFormField(defaultSearchQuery);
            setResultFromSearch(defaultEmptyActorObject);
            return;
        }
        searchMovie(formField.query)
        .then((response) => {
            setResultFromSearch(response);
            return response.id;
        })
        .then( (movieId) => {return fetchCastDataForMovie(movieId)})
        .then( (responseData) => setSearchData(responseData))
        setFormField(defaultSearchQuery);
    }

    return (
        <div>
            <div>Search: </div>
            <input 
                id="query"
                onChange={onQueryChange}
                value={formField.query}
            />
            <div>
                <button className="btn btn-info" onClick={onClickSearchActor}>Search Actor</button>
                <button className="btn btn-info" onClick={onClickSearchMovie}>Search Movie</button>
            </div>
            <div>
            <p>
                {resultFromSearch.name !== null && 
                `Your search found ${resultFromSearch.name}`}
            </p>
            {resultFromSearch.name !== null && 
            (<div>
            <AssetList
                assets={[resultFromSearch, ...searchData]}
                onClick={onClickAssetList}
                goalActors={[]}
            />
            </div>)}
            </div>
        </div>
    );
};

SearchBar.propTypes = {
    searchActor: PropTypes.func.isRequired, 
    searchMovie: PropTypes.func.isRequired, 
    resultFromSearch: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        imagePath: PropTypes.string,
        type: PropTypes.string, 
    }), 
    setResultFromSearch: PropTypes.func.isRequired, 
    searchData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            imagePath: PropTypes.string,
            type: PropTypes.string, 
        })
    ),
    setSearchData: PropTypes.func.isRequired,
    defaultEmptyActorObject: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        imagePath: PropTypes.string,
        type: PropTypes.string, 
    }),
    fetchMovieCreditsForActor: PropTypes.func.isRequired,
    fetchCastDataForMovie: PropTypes.func.isRequired,
    onClickAssetList: PropTypes.func.isRequired
}


export default SearchBar;