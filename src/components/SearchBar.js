import React, { useState } from 'react';
import AssetList from './AssetList';

const SearchBar = ( {
    searchActor, searchMovie, 
    resultFromSearch, setResultFromSearch, 
    defaultEmptyActorObject,
    fetchMovieCreditsForActor,
    fetchCastDataForMovie,
    onClickAssetList } ) => {
    
    const defaultSearchQuery = { query: '' };
    const [formField, setFormField] = useState(defaultSearchQuery);
    const [searchData, setSearchData] = useState([])

    const onQueryChange = (event) => {
        setFormField({ query: event.target.value });
    }

    const onClickSearchActor = (event) => {
        event.preventDefault();
        if (formField.query.length === 0){
            setFormField(defaultSearchQuery);
            setResultFromSearch(defaultEmptyActorObject);
            window.alert('Search may not be blank');
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
            setFormField(defaultSearchQuery);
            setResultFromSearch(defaultEmptyActorObject);
            window.alert('Search may not be blank');
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
                {resultFromSearch.name.length > 0 && 
                `Your search found ${resultFromSearch.name}`}
            </p>
            {resultFromSearch.name !== '' && 
            (<div>
            <AssetList
                assets={[resultFromSearch, ...searchData]}
                onClick={{onClickAssetList}}
            />
            </div>)}
            </div>
        </div>
    );
};


export default SearchBar;