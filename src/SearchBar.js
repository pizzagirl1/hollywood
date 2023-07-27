import React, { useState } from 'react';

const SearchBar = ( {searchActor, searchResult, setSearchResult} ) => {
    const defaultSearchQuery = { query: '' };
    const [formField, setFormField] = useState(defaultSearchQuery);

    const onQueryChange = (event) => {
        setFormField({ query: event.target.value });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (formField.query.length === 0){
            window.alert('Search may not be blank');
            return;
        }
        searchActor(formField.query).then((response) => setSearchResult(response));
        console.log("Your search query is: ", formField.query);
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
                {searchResult.name.length > 0 && 
                `Your search found ${searchResult.name}`}
            </p>
            </div>
        </div>
    );
};


export default SearchBar;