import React, { useState } from 'react';

const SearchBar = () => {
    const defaultSearchQuery = { query: '' };
    const [formField, setFormField] = useState(defaultSearchQuery);

    const onQueryChange = (event) => {
        setFormField({ query: event.target.value });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        console.log("Your search query is: ", formField.query)
        setFormField(defaultSearchQuery)
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
        </div>
    );
};


export default SearchBar;