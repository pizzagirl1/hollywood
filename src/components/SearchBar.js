import React, { useState } from 'react';
import AssetList from './AssetList';

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
                <button onClick={onClickSearchActor}>Search Actor</button>
                <button onClick={onClickSearchMovie}>Search Movie</button>
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


export default SearchBar;