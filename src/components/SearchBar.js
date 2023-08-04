import React, { useState } from 'react';

const SearchBar = ( {
    searchActor, searchMovie, 
    resultFromSearch, setResultFromSearch, 
    defaultEmptyActorObject} ) => {
    
    const defaultSearchQuery = { query: '' };
    const [formField, setFormField] = useState(defaultSearchQuery);

    const nameOfSearchResult = resultFromSearch.type === 'Movie' ? resultFromSearch.title :
            resultFromSearch.name;

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
        searchActor(formField.query).then((response) => {
            setResultFromSearch(response);
        });
        
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
        searchMovie(formField.query).then((response) => {
            setResultFromSearch(response);
        });
        
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
                {nameOfSearchResult.length > 0 && 
                `Your search found ${nameOfSearchResult}`}
            </p>
            </div>
        </div>
    );
};


export default SearchBar;