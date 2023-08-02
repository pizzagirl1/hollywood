import React, { useState } from 'react';

const SearchBar = ( {searchActor, resultFromSearch, setResultFromSearch, defaultEmptyActorObject} ) => {
    const defaultSearchQuery = { query: '' };
    const [formField, setFormField] = useState(defaultSearchQuery);

    const onQueryChange = (event) => {
        setFormField({ query: event.target.value });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (formField.query.length === 0){
            setFormField(defaultSearchQuery);
            setResultFromSearch(defaultEmptyActorObject);
            window.alert('Search may not be blank');
            return;
        }
        searchActor(formField.query).then((response) => setResultFromSearch(response));
        setFormField(defaultSearchQuery);
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div>Search: </div>
                <input 
                    id="query"
                    onChange={onQueryChange}
                    value={formField.query}
                />
            </form>
            <div>
            <p>
                {resultFromSearch.name.length > 0 && 
                `Your search found ${resultFromSearch.name}`}
            </p>
            </div>
        </div>
    );
};


export default SearchBar;